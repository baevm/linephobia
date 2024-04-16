package counter

import (
	"linephobia/backend/internal/services/counter"

	"github.com/hibiken/asynq"
)

type CounterHandler struct {
	counterService *counter.CounterService
}

func NewHandler(counterService *counter.CounterService) *CounterHandler {
	return &CounterHandler{
		counterService: counterService,
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
