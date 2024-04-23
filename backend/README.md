# linephobia/backend



1. create .env file at ./config with structure:
```
# POSTGRES CONFIG
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DB_DSN=

# SERVICE CONFIG
API_HOST=
API_PORT=

# REDIS CONFIG
REDIS_HOST=
REDIS_PORT=
```

2. migrate db
```
make db/migrate
```

3. start up
```
make run
```