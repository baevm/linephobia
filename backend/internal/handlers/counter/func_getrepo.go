package counter

import (
	"errors"
	"loc-web-app/backend/internal/handlers"
	"loc-web-app/backend/internal/models"
	"loc-web-app/backend/internal/services/counter"
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

type RepoRequest struct {
	GitUrl string `query:"git_url"`
}

type RepoResponse struct {
	ID        int64                  `json:"id"`
	Url       string                 `json:"url"`
	Owner     string                 `json:"owner"`
	Name      string                 `json:"name"`
	CreatedAt pgtype.Timestamptz     `json:"created_at"`
	Stats     models.LanguageSummary `json:"stats"`
}

func (ch *CounterHandler) GetRepo(c echo.Context) error {
	var req RepoRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
			Error: "bad request",
		})
	}

	repoStats, err := ch.counterService.GetRepo(req.GitUrl)

	if err != nil {
		if errors.Is(err, counter.ErrRepoNotFound) {
			return c.JSON(http.StatusNotFound, handlers.ErrResponse{
				Error: "repo not found",
			})
		}

		return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
			Error: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, RepoResponse{
		ID:        repoStats.ID.Int64,
		Url:       repoStats.Url,
		Owner:     repoStats.Owner,
		Name:      repoStats.Name,
		CreatedAt: repoStats.CreatedAt,
		Stats:     repoStats.Stats,
	})
}
