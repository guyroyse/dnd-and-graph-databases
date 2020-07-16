const graph = require('./src/data/redis-executor')
const Dungeon = require('./src/dungeon')

async function start() {
  graph.open('dungeon')
  await Dungeon.generate()
  graph.close()
}

start()
