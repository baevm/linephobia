package globalstats

import (
	"context"
	"linephobia/backend/internal/handlers"
	"linephobia/backend/internal/services/globalstats"
	"net/http"

	"github.com/labstack/echo/v4"
)

type GlobalStatsHandler struct {
	globalStatsService *globalstats.GlobalStatsService
}

func NewHandler(globalStatsService *globalstats.GlobalStatsService) *GlobalStatsHandler {
	return &GlobalStatsHandler{
		globalStatsService: globalStatsService,
	}
}

type GlobalStatsResponse struct {
	globalstats.Stats
}

func (gsh *GlobalStatsHandler) GetGlobalStats(c echo.Context) error {
	stats, err := gsh.globalStatsService.GetAllStats(context.Background())

	if err != nil {
		return c.JSON(http.StatusInternalServerError, handlers.ErrResponse{
			Error: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, GlobalStatsResponse{
		Stats: *stats,
	})
}
