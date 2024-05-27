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


-- name: GetPopular :many
SELECT r.id, r.owner, r.name, r.site, r.url, p.search_count
FROM "popular" as p
LEFT JOIN "repostats" as r
ON p.id = r.id
ORDER BY search_count DESC
LIMIT 10;

-- name: UpdatePopular :exec
UPDATE "popular"
SET search_count = COALESCE(search_count, 0) + 1
WHERE id=$1;

-- name: CreatePopularItem :one
INSERT INTO "popular" (ID)
VALUES ($1)
RETURNING id, search_count, created_at; 

-- name: GetRecent :many
SELECT id, owner, name, site, url, created_at
FROM "repostats"
ORDER BY created_at DESC
LIMIT 10;