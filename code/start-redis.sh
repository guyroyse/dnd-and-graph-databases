docker image pull redislabs/redismod

docker run \
  -p 6379:6379 \
  -v `pwd`/data:/data \
  redislabs/redismod \
  --requirepass foobared \
  --loadmodule /usr/lib/redis/modules/redisgraph.so \
  --dir /data \
  --save 60 1
