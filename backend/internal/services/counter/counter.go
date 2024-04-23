package counter

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"linephobia/backend/internal/db"
	"linephobia/backend/internal/models"
	"linephobia/backend/internal/queue"
	"linephobia/backend/pkg/git"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/boyter/scc/v3/processor"
	"github.com/hibiken/asynq"
	"github.com/jackc/pgx/v5"
)

type CounterService struct {
	queue *queue.QueueClient
	db    *db.Queries
}

const REPOS_FOLDER = "./tmp"

var ErrRepoNotFound = errors.New("repo not found")
var ErrTaskNotFound = asynq.ErrTaskNotFound
var ErrTaskAlreadyQueued = errors.New("this repository already queued")

func NewService(q *queue.QueueClient, repo *db.Queries) *CounterService {
	err := os.MkdirAll(REPOS_FOLDER, os.ModePerm)

	if err != nil {
		log.Fatalln(err.Error())
	}

	return &CounterService{
		queue: q,
		db:    repo,
	}
}

func (cs *CounterService) GetRepo(gitUrl string) (*db.Repostat, error) {
	urlStruct, err := git.DecodeURL(gitUrl)

	if err != nil {
		return nil, err
	}

	stats, err := cs.db.GetRepo(context.Background(), db.GetRepoParams{
		Site:  urlStruct.Site,
		Owner: urlStruct.Owner,
		Name:  urlStruct.Name,
	})

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrRepoNotFound
		} else {
			return nil, err
		}
	}

	return stats, nil
}

// Принимает на вход валидную ссылку на гит репозиторий.
// Возвращает id задачи на обработку.
// Если задача на обработку репозитория существует, возвращает ошибку
func (cs *CounterService) EnqueueLOCTask(gitUrl string) (string, error) {
	id, task, err := queue.NewLOCProcessTask(gitUrl)

	if err != nil {
		return "", err
	}

	existTask, err := cs.SearchLOCTask(id)

	if err != nil {
		if !errors.Is(err, ErrTaskNotFound) {
			return "", err
		}
	}

	if existTask != nil {
		return "", ErrTaskAlreadyQueued
	}

	newTask, err := cs.queue.Client.Enqueue(task)

	if err != nil {
		return "", err
	}

	return newTask.ID, nil
}

// Поиск задачи на обработку репозитория
func (cs *CounterService) SearchLOCTask(gitUrl string) (*asynq.TaskInfo, error) {
	urlStruct, err := git.DecodeURL(gitUrl)

	if err != nil {
		return nil, err
	}

	taskId := queue.BuildTaskId(urlStruct)

	taskInfo, err := cs.queue.Inspector.GetTaskInfo(queue.PROCESSOR_QUEUE, taskId)

	if err != nil {
		return nil, err
	}

	return taskInfo, nil
}

func (cs *CounterService) HandleLOCProcessTask(ctx context.Context, t *asynq.Task) error {
	var p queue.LOCProcessPayload

	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("json.Unmarshal failed: %v: %w", err, asynq.SkipRetry)
	}

	log.Printf("starting processing repo: task_id=%s, git_Url=%s\n", "todo", p.GitUrl)

	ls, err := processRepoLOC(p.GitUrl)

	if err != nil {
		log.Printf("failed to process repo: task_id=%s, git_Url=%s, error: %s\n", "todo", p.GitUrl, err.Error())
	}

	log.Printf("finished processing repo: task_id=%s, git_Url=%s\n", "todo", p.GitUrl)

	/* Сохранение json статов в БД */
	res, err := cs.db.SaveRepo(context.Background(), db.SaveRepoParams{
		Url:   p.GitUrl,
		Site:  p.RepoSite,
		Owner: p.RepoOwner,
		Name:  p.RepoName,
		Stats: ls,
	})

	if err != nil {
		log.Printf("failed to save repo in db: task_id=%s, git_Url=%s, error: %s\n", "todo", p.GitUrl, err.Error())
	}

	log.Printf("saved repo in db: task_id=%s, git_Url=%s, created_at: %s\n", "todo", p.GitUrl, res.CreatedAt.Time.Local().String())

	return nil
}

func processRepoLOC(gitUrl string) (models.LanguageSummary, error) {
	/* CLONE REPO */
	repoUrl, err := url.Parse(gitUrl)
	if err != nil {
		log.Fatalln(err)
	}

	repoFullName := repoUrl.Path
	repoPath := REPOS_FOLDER + repoFullName

	_, err = git.Clone(repoPath, repoUrl.String())
	if err != nil {
		log.Fatalln(err)
	}

	/* RUN SCC PROCESSOR */
	resFileName := strings.ReplaceAll(repoFullName[1:], "/", "-")
	resPath := fmt.Sprintf("%s/%s.json", repoPath, resFileName)

	processor.DirFilePaths = []string{repoPath}
	processor.FileOutput = resPath
	processor.Format = "json"
	processor.ConfigureGc()
	processor.ConfigureLazy(true)
	processor.Process()

	defer cleanUp(repoPath)

	/* READ AND RETURN RESULT */
	file, err := os.Open(resPath)

	if err != nil {
		log.Println(err)
	}

	defer file.Close()

	data, err := io.ReadAll(file)

	if err != nil {
		log.Println(err)
	}

	var languagesData []models.Language

	err = json.Unmarshal(data, &languagesData)

	if err != nil {
		log.Println(err)
	}

	ls := models.LanguageSummary{
		Languages: languagesData,
		Total:     models.TotalSummary{},
	}

	for _, lang := range languagesData {
		ls.Total.Lines += lang.Lines
		ls.Total.Blank += lang.Blank
		ls.Total.Code += lang.Code
		ls.Total.Comment += lang.Comment
		ls.Total.Files += int64(len(lang.Files))
	}

	return ls, nil
}

func cleanUp(path string) {
	err := os.RemoveAll(path)
	if err != nil {
		log.Println(err)
	}

	// Remove empty repo folder
	repoPath := strings.Split(path, "/")
	err = os.Remove(REPOS_FOLDER + "/" + repoPath[2])
	if err != nil {
		log.Println(err)
	}
}
