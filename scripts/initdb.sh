#!/bin/bash
set -e

echo Initializing database!

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE SCHEMA ping_pong_players;

  CREATE TABLE ping_pong_players.users ( 
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password text NOT NULL
  );

  CREATE TABLE ping_pong_players.players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    rating integer NOT NULL,
    handedness VARCHAR(100) NOT NULL
  );
EOSQL

