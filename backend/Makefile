include ./config/.env
## help: print this help message
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'


#=============================================================================
#========================== SERVER ===========================================
#=============================================================================

## run: runs app
.PHONY: run
run:
	go run ./cmd/api

## build/api: build app binary for windows and linux
.PHONY: build/api
build/api:
	@echo 'Building cmd/api'
	GOOS=linux GOARCH=amd64 go build -ldflags='-s' -o=./bin/api ./cmd/api

## test: runs tests
.PHONY: test
test:
	go test -v ./... 



#=============================================================================
#========================== DEPLOY ===========================================
#=============================================================================
## compose: runs local docker compose
.PHONY: compose/local
compose/local:
	docker compose -f ../deploy/docker-compose.yml --env-file ./config/.env up

## compose: runs production docker compose
.PHONY: compose/prod
compose/prod:
	docker compose -f ../deploy/prod.docker-compose.yml --env-file ./config/.env up

## docker/build: builds docker image
# .PHONY: docker/build
# docker/build:
# 	docker build --no-cache -t loc-api -f ./Dockerfile .



#=============================================================================
#========================== DATABASE =========================================
#=============================================================================

## db/migrate: executes all migrations from migrations folder
.PHONY: db/migrate
db/migrate:
	migrate -path=./internal/db/migrations -database=${DB_DSN} up

## db/migrate-down: executes all drop migrations from migrations folder
.PHONY: db/migrate-down
db/migrate-down:
	migrate -path=./internal/db/migrations -database=${DB_DSN} down

## db/unmigrate: executes one migration drop from migrations folder
.PHONY: db/migrate-down-one
db/migrate-down-one:
	migrate -path=./internal/db/migrations -database=${DB_DSN} down 1

## db/migration name=$1: creates new migration with given name
.PHONY: db/migration
db/migration:
	migrate create -seq -ext .sql -dir ./internal/db/migrations ${name}

## db/sqlc: generates sqlc queries
.PHONY: db/sqlc
db/sqlc:
	sqlc generate

	