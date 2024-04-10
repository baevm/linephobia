package counter

import (
	"loc-web-app/backend/internal/services/counter"

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

type TaskState string

const (
	STATE_PENDING    TaskState = "pending"
	STATE_PROCESSING TaskState = "processing"
	STATE_COMPLETE   TaskState = "complete"
	STATE_ERROR      TaskState = "error"
)

func getState(asynqState asynq.TaskState) TaskState {
	switch asynqState {
	case asynq.TaskStatePending:
		return STATE_PENDING
	case asynq.TaskStateActive:
		return STATE_PROCESSING
	case asynq.TaskStateCompleted:
		return STATE_COMPLETE
	default:
		return STATE_ERROR
	}
}
