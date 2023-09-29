#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DROP DATABASE IF EXISTS blog;
    CREATE DATABASE blog;
EOSQL

psql -U postgres -d blog < /docker-entrypoint-initdb.d/blog_dump.sql

exec "$@"
