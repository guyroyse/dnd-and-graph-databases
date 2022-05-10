# Setup Redis + RedisGraph with Docker Compose

This folder contains a Docker Compose file configured to use the latest version of Redis Stack; a Docker image with Redis and the most popular Redis modules.

## Pre-requisites

- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

This image runs Redis on the default port 6379 which you can access as if
it were a local install of Redis. Just ensure that you shut down any other
Redis instances that might be on port 6379 before starting this one.

It also run Redis Insight 2.0 on port 8002. Just point your web browser of
choice to http://localhost:8002 and start browsing your database.

The image stores the data file under the ./data directory in a file named
dump.rdb.

To launch Redis simply enter:

```
$ docker compose up
```
