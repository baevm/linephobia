package counter

import (
	"context"
	"errors"
	"linephobia/backend/internal/handlers"
	"linephobia/backend/internal/models"
	"linephobia/backend/internal/services/counter"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

type RepoRequest struct {
	GitUrl string `query:"git_url"`
}

type RepoResponse struct {
	ID        int64                   `json:"id,omitempty"`
	Url       string                  `json:"url,omitempty"`
	Owner     string                  `json:"owner,omitempty"`
	Name      string                  `json:"name,omitempty"`
	CreatedAt *pgtype.Timestamptz     `json:"created_at,omitempty"`
	Stats     *models.LanguageSummary `json:"stats,omitempty"`
	Status    string                  `json:"status"`
}

func (ch *CounterHandler) GetRepo(c echo.Context) error {
	var req RepoRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
			Error: "bad request",
		})
	}

	// check if repo exists
	repoStats, err := ch.counterService.GetRepo(req.GitUrl)

	if err != nil {
		// if repo not found
		if errors.Is(err, counter.ErrRepoNotFound) {
			// check if task for this repo already queued
			taskInfo, err := ch.counterService.SearchLOCTask(req.GitUrl)

			if err != nil {
				// if task not found queue task for processing
				if errors.Is(err, counter.ErrTaskNotFound) {
					// enqueue new task
					_, err := ch.counterService.EnqueueLOCTask(req.GitUrl)

					if err != nil {
						return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
							Error: err.Error(),
						})
					}

					return c.JSON(http.StatusAccepted, RepoResponse{
						Status: string(STATUS_PENDING),
					})
				}

				return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
					Error: "Internal server error",
				})
			}

			// if task for this repo already exist, return its status
			if taskInfo != nil {
				taskStatus := string(getStatus(taskInfo.State))

				return c.JSON(http.StatusOK, RepoResponse{
					Status: taskStatus,
				})
			}
		}

		// if repo error other than 404
		return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
			Error: err.Error(),
		})
	}

	err = ch.globalStatsService.UpdatePopular(context.Background(), repoStats.ID.Int64)

	if err != nil {
		log.Println(err)
	}

	return c.JSON(http.StatusOK, RepoResponse{
		ID:        repoStats.ID.Int64,
		Url:       repoStats.Url,
		Owner:     repoStats.Owner,
		Name:      repoStats.Name,
		CreatedAt: &repoStats.CreatedAt,
		Stats:     &repoStats.Stats,
		Status:    string(STATUS_COMPLETE),
	})
}
