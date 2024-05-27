package counter

import (
	"linephobia/backend/internal/services/counter"
	"linephobia/backend/internal/services/globalstats"

	"github.com/hibiken/asynq"
)

type CounterHandler struct {
	counterService     *counter.CounterService
	globalStatsService *globalstats.GlobalStatsService
}

func NewHandler(
	counterService *counter.CounterService,
	globalStatsService *globalstats.GlobalStatsService,
) *CounterHandler {
	return &CounterHandler{
		counterService:     counterService,
		globalStatsService: globalStatsService,
	}
}

type TaskStatus string

const (
	STATUS_PENDING    TaskStatus = "pending"
	STATUS_PROCESSING TaskStatus = "processing"
	STATUS_COMPLETE   TaskStatus = "complete"
	STATUS_ERROR      TaskStatus = "error"
)

func getStatus(asynqState asynq.TaskState) TaskStatus {
	switch asynqState {
	case asynq.TaskStatePending:
		return STATUS_PENDING
	case asynq.TaskStateActive:
		return STATUS_PROCESSING
	case asynq.TaskStateCompleted:
		return STATUS_COMPLETE
	default:
		return STATUS_ERROR
	}
}
