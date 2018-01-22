FROM postgres:10
COPY ./scripts/initdb.sh /docker-entrypoint-initdb.d/
