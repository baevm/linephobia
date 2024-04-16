package counter

import (
	"errors"
	"fmt"
	"linephobia/backend/internal/handlers"
	"linephobia/backend/internal/services/counter"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ProcessRequest struct {
	GitUrl string `json:"git_url"`
}

type ProcessResponse struct {
	Id string `json:"id"`
}

func (ch *CounterHandler) ProcessLOC(c echo.Context) error {
	var req ProcessRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
			Error: "Bad request",
		})
	}

	/* Проверить обработан ли уже репозиторий */
	repo, err := ch.counterService.GetRepo(req.GitUrl)

	if err != nil {
		if !errors.Is(err, counter.ErrRepoNotFound) {
			return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
				Error: "Internal server error",
			})
		}
	}

	if repo != nil {
		return c.JSON(http.StatusConflict, handlers.ErrResponse{
			Error: fmt.Sprintf("Stats for %s are already processed", req.GitUrl),
		})
	}

	/* Поставить задачу на обработку */
	taskId, err := ch.counterService.EnqueueLOCTask(req.GitUrl)

	if err != nil {
		if errors.Is(err, counter.ErrTaskAlreadyQueued) {
			return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
				Error: err.Error(),
			})
		}

		return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
			Error: "Internal server error",
		})
	}

	res := ProcessResponse{
		Id: taskId,
	}

	return c.JSON(http.StatusOK, res)
}
