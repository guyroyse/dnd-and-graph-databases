const _ = require('lodash')

const graph = require('./redis-executor')
const rando = require('./randomizer')
const Room = require('./room')

class Dungeon {

  static async generate({ numberOfRooms = 20, numberOfEntrances = 1 } = {}) {
    let name = rando.dungeonName()

    let dungeon = new Dungeon()
    await dungeon.save(name)

    let rooms = await Promise.all(
      new Array(numberOfRooms)
        .fill()
        .map(async _ => await Room.generate()))

    await Promise.all(
      _.sampleSize(rooms, numberOfEntrances)
        .map(async room => await dungeon.addEntrance(room)))

    return dungeon
  }

  async save(name) {
    let query = `
      CREATE (d:dungeon) SET d.name = $name
      RETURN id(d), d.name`
    let values = await graph.executeAndReturnSingle(query, { name })
    this.id = values[0]
    this.name = values[1]
  }

  async addEntrance(room) {
    let query = `
      MATCH (d:dungeon) WHERE id(d) = $dungeonId
      MATCH (r:room) WHERE id(r) = $roomId
      CREATE (d)-[:has_entrance_to]->(r)`
    await graph.execute(query, { dungeonId: this.id, roomId: room.id })
    if (!this.entrances) this.entrances = []
    this.entrances.push(room)
  }
}

module.exports = Dungeon
