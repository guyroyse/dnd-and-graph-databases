# Setup Redis + RedisGraph with Docker Compose

This folder contains a Docker Compose file configured to use the edge version of RedisLabs
redismod image; a Docker image with selected Redis Labs modules. It loads only the RedisGraph
module.

## Pre-requisites

- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

This image runs Redis on the default port 6379 which you can access as if
it were a local install of Redis. Just ensure that you shut down any other
Redis instances that might be on port 6379 before starting this one.

It also run Redis in snapshot mode. Periodically, as defined in the docker-compose.yml,
a snapshot of the database will be saved to disk. When the server is stopped and started,
that snapshot will be loaded back into memory, reconstructing the original dataset.

The image stores the data file under the ./data directory.

To launch Redis simply enter:

```
$ docker compose up
```
