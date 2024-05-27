ALTER TABLE "repostats"
 ADD CONSTRAINT unique_id UNIQUE(id);

CREATE TABLE "popular" (
    id bigserial references repostats(id) PRIMARY KEY,
    search_count int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

