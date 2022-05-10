import graph from './src/data/redis-executor.js'
import Dungeon from './src/dungeon.js'

await graph.open()
await Dungeon.generate()
await graph.close()
