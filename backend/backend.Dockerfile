FROM golang:1.21-alpine as builder

RUN apk add --no-cache git curl

WORKDIR /app

## Install go-migrate
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.16.2/migrate.linux-amd64.tar.gz | tar xvz 

COPY go.mod go.sum ./

RUN go mod download

# Copy the source from the current directory to the working Directory inside the container
COPY ../ .

# Build the Go app
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags='-s' -o=./bin/api ./cmd/api

# Start fresh from a smaller image
FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/migrate ./migrate
COPY --from=builder /app/config ./config
COPY --from=builder /app/start.sh .
COPY --from=builder /app/config/.env . 
COPY --from=builder /app/internal/db/migrations ./migrations
COPY --from=builder /app/bin/api .
COPY --from=builder /app/certs/ ./certs

RUN chmod u+x ./start.sh

EXPOSE 8443

CMD ["./api"]
ENTRYPOINT ["./start.sh"]