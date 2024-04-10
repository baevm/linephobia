package counter

import (
	"errors"
	"fmt"
	"loc-web-app/backend/internal/handlers"
	"loc-web-app/backend/internal/services/counter"
	"net/http"

	"github.com/labstack/echo/v4"
)

type CheckRequest struct {
	Id string `param:"id"`
}

type CheckResponse struct {
	State string `json:"state"`
}

func (ch *CounterHandler) CheckProcessLOC(c echo.Context) error {
	var req CheckRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
			Error: "Bad request",
		})
	}

	taskInfo, err := ch.counterService.SearchLOCTask(req.Id)

	if err != nil {
		if errors.Is(err, counter.ErrTaskNotFound) {
			return c.JSON(http.StatusBadRequest, handlers.ErrResponse{
				Error: fmt.Sprintf("Task with id: %s not found", req.Id),
			})
		}

		return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
			Error: "Internal server error",
		})
	}

	taskState := string(getState(taskInfo.State))

	return c.JSON(http.StatusOK, CheckResponse{
		State: taskState,
	})
}
