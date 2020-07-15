const graph = require('./src/redis-executor')
const Dungeon = require('./src/dungeon')

async function start() {
  graph.open()

  let dungeon = await Dungeon.generate({ numberOfRooms: 20, numberOfEntrances: 2 })

  console.log(dungeon.name)
  console.log("Entrances to:", dungeon.entrances
    .map(entrance => entrance.name)
    .join(', '))

  graph.close()
}

start()
