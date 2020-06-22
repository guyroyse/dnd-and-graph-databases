const graph = require('./src/redis-executor')

const Dungeon = require('./src/dungeon')

async function start() {
  graph.open()
  let dungeon = await Dungeon.generate()
  console.log(dungeon)
  graph.close()
}

start()
