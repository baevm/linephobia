package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPg(db_dsn string) (*pgxpool.Pool, error) {
	log.Println("Connecting to db...")
	db, err := pgxpool.New(context.Background(), db_dsn)

	if err := db.Ping(context.Background()); err != nil {
		return nil, err
	}

	return db, err
}
