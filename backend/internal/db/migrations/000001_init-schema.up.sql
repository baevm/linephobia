CREATE TABLE "repostats" (
    id bigserial,
    url varchar NOT NULL,
    site varchar NOT NULL,
    owner varchar NOT NULL,
    name varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    stats json NOT NULL,

    PRIMARY KEY (owner, name)
);

