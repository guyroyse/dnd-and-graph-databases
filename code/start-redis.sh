docker run \
  -p 6379:6379 \
  -v `pwd`/data:/data \
  redislabs/redismod \
  --loadmodule /usr/lib/redis/modules/redisgraph.so \
  --dir /data \
  --save 60 5
