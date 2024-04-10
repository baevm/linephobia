package main

import (
	"context"
	"fmt"
	"loc-web-app/backend/config"
	"loc-web-app/backend/internal/db"
	counterH "loc-web-app/backend/internal/handlers/counter"
	"loc-web-app/backend/internal/queue"
	counterSvc "loc-web-app/backend/internal/services/counter"
	"log"
	"os/signal"
	"syscall"

	"github.com/labstack/echo/v4"
)

/*
1. Добавить логгер
5. Добавить swagger doc
*/
func main() {
	/* LOAD CONFIG */
	err := config.Load(".")

	if err != nil {
		log.Fatalln(err)
	}

	e := echo.New()

	/* QUEUE SETUP */
	redisAddr := fmt.Sprintf("%s:%s", config.Data.REDIS_HOST, config.Data.REDIS_PORT)
	q, qMux := queue.NewQueue(redisAddr)
	defer q.Client.Close()
	queueServer := queue.NewServer(redisAddr)

	/* DB SETUP */
	pg, err := db.NewPg(config.Data.DB_DSN)

	if err != nil {
		log.Fatalln(err)
	}

	defer pg.Close()

	repo := db.New(pg)

	/* CONSTRUCTORS */
	cs := counterSvc.NewService(q, repo)
	ch := counterH.NewHandler(cs)

	/* QUEUE ROUTING */
	qMux.HandleFunc(queue.TypeLOCProcess, cs.HandleLOCProcessTask)

	go func() {
		if err := queueServer.Run(qMux); err != nil {
			log.Fatalln(err)
		}

	}()

	/* GRACEFUL SHUTDOWN */
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	go func() {
		<-ctx.Done()

		log.Println("Got shutdown signal.")

		e.Shutdown(context.TODO())
		queueServer.Shutdown()
	}()

	/* HTTP ROUTING */
	e.POST("/v1/loc/process", ch.ProcessLOC)
	e.GET("/v1/loc/check/:id", ch.CheckProcessLOC)
	e.GET("/v1/repo", ch.GetRepo)

	e.Logger.Fatal(
		e.Start(fmt.Sprintf("%s:%s", config.Data.API_HOST, config.Data.API_PORT)),
	)
}
