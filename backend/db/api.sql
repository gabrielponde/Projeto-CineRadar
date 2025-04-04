CREATE DATABASE cineradar;

CREATE TABLE genres (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE providers (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    logo_path VARCHAR(255)
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    poster_path VARCHAR(255),
    release_date DATE,
    tmdb_id INTEGER
);

-- Tabelas de relacionamento
CREATE TABLE movie_genres (
    movie_id INTEGER REFERENCES movies(id),
    genre_id INTEGER REFERENCES genres(id),
    PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE movie_providers (
    movie_id INTEGER REFERENCES movies(id),
    provider_id INTEGER REFERENCES providers(id),
    PRIMARY KEY (movie_id, provider_id)
);