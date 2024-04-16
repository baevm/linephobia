package counter

import (
	"errors"
	"fmt"
	"linephobia/backend/internal/handlers"
	"linephobia/backend/internal/services/counter"
	"net/http"

	"github.com/labstack/echo/v4"
)

type CheckRequest struct {
	GitUrl string `query:"git_url"`
}

type CheckResponse struct {
	Status string `json:"status"`
}

func (ch *CounterHandler) CheckProcessLOC(c echo.Context) error {
	var req CheckRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
			Error: "Bad request",
		})
	}

	taskInfo, err := ch.counterService.SearchLOCTask(req.GitUrl)

	if err != nil {
		if errors.Is(err, counter.ErrTaskNotFound) {
			return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
				Error: fmt.Sprintf("Task with id: %s not found", req.GitUrl),
			})
		}

		return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
			Error: "Internal server error",
		})
	}

	taskStatus := string(getState(taskInfo.State))

	return c.JSON(http.StatusOK, CheckResponse{
		Status: taskStatus,
	})
}
