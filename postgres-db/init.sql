CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL
);

INSERT INTO todos (text) VALUES ('Learn Docker Compose'), ('Build a Todo App');