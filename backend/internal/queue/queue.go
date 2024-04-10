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

	return &QueueClient{
		Client:    client,
		Inspector: inspector,
	}, mux
}

func NewServer(redisAddr string) *asynq.Server {
	srv := asynq.NewServer(
		asynq.RedisClientOpt{Addr: redisAddr},
		asynq.Config{Concurrency: 1},
	)

	return srv
}
