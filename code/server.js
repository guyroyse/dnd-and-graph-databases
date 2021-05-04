import graph from './src/data/redis-executor.js'
import Dungeon from './src/dungeon.js'

async function start() {
  graph.open('dungeon')
  await Dungeon.generate()
  graph.close()
}

start()
