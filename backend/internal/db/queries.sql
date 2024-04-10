-- name: GetRepo :one
SELECT * FROM "repostats"
WHERE site=$1 and owner = $2 and name = $3
LIMIT 1;

-- name: SaveRepo :one
INSERT INTO "repostats" (
    url,
    site,
    owner,
    name,
    stats
) VALUES ($1, $2, $3, $4, $5) 
RETURNING id, created_at;