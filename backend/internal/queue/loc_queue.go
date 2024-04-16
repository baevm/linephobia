package queue

import (
	"encoding/json"
	"fmt"
	"linephobia/backend/pkg/git"

	"github.com/hibiken/asynq"
)

const (
	TypeLOCProcess = "loc:process"
)

type LOCProcessPayload struct {
	GitUrl    string
	RepoSite  string
	RepoOwner string
	RepoName  string
}

type LOCProcessor struct {
}

func NewLOCProcessor() *LOCProcessor {
	return &LOCProcessor{}
}

func NewLOCProcessTask(gitUrl string) (string, *asynq.Task, error) {
	urlStruct, err := git.DecodeURL(gitUrl)

	if err != nil {
		return "", nil, err
	}

	payload, err := json.Marshal(LOCProcessPayload{
		GitUrl:    gitUrl,
		RepoSite:  urlStruct.Site,
		RepoOwner: urlStruct.Owner,
		RepoName:  urlStruct.Name,
	})

	if err != nil {
		return "", nil, err
	}

	id := BuildTaskId(urlStruct)

	return id, asynq.NewTask(
		TypeLOCProcess,
		payload,
		asynq.TaskID(id),
		asynq.MaxRetry(0)), nil
}

func BuildTaskId(urlStruct *git.RepoParams) string {
	return fmt.Sprintf("%s/%s/%s", urlStruct.Site, urlStruct.Owner, urlStruct.Name)
}
