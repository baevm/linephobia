package queue

import (
	"github.com/hibiken/asynq"
)

type QueueClient struct {
	Client    *asynq.Client
	Inspector *asynq.Inspector
}

func NewQueue(redisAddr string) (*QueueClient, *asynq.ServeMux) {
	opts := asynq.RedisClientOpt{Addr: redisAddr}

	client := asynq.NewClient(opts)
	mux := asynq.NewServeMux()
	inspector := asynq.NewInspector(opts)

	// Create temporary task,
	// because asynq is not creating queue on first start up ???
	_, tempTask, _ := NewLOCProcessTask("https://github.com/octocat/Hello-World")
	client.Enqueue(tempTask)

	return &QueueClient{
		Client:    client,
		Inspector: inspector,
	}, mux
}

func NewServer(redisAddr string) *asynq.Server {
	srv := asynq.NewServer(
		asynq.RedisClientOpt{Addr: redisAddr},
		asynq.Config{
			Concurrency: 1,
			Queues: map[string]int{
				PROCESSOR_QUEUE: 10,
			},
		},
	)

	return srv
}
