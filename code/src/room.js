const graph = require('./redis-executor')
const rando = require('./randomizer')
const Monster = require('./monster')
const Treasure = require('./treasure')

class Room {

  static async generate() {
    let name = rando.roomName()

    let room = new Room()
    await room.save(name)

    let numberOfMonsters = Math.max(0, rando.d6() - 3)
    await Promise.all(
      new Array(numberOfMonsters)
        .fill()
        .map(async _ => {
          let monster = await Monster.generate()
          await room.addMonster(monster)
        }))

    let numberOfTreasures = Math.max(0, rando.d8() - 5)
    await Promise.all(
      new Array(numberOfTreasures)
        .fill()
        .map(async _ => {
          let treasure = await Treasure.generate()
          await room.addTreasure(treasure)
        }))

    
    return room
  }

  async save(name) {
    let query = `
      CREATE (r:room) SET r.name = $name
      RETURN id(r), r.name`
    let values = await graph.executeAndReturnSingle(query, { name })
    this.id = values[0]
    this.name = values[1]
  }

  async addMonster(monster) {
    let query = `
      MATCH (r:room) WHERE id(r) = $roomId
      MATCH (m:monster) WHERE id(m) = $monsterId
      CREATE (r)-[:contains]->(m)`
    await graph.execute(query, { roomId: this.id, monsterId: monster.id })
    console.log(monster)
    if (!this.monsters) this.monsters = []
    this.monsters.push(monster)
  }

  async addTreasure(treasure) {
    let query = `
      MATCH (r:room) WHERE id(r) = $roomId
      MATCH (t:treasure) WHERE id(t) = $treasureId
      CREATE (r)-[:contains]->(t)`
    await graph.execute(query, { roomId: this.id, treasureId: treasure.id })
    console.log(treasure)
    if (!this.treasures) this.treasures = []
    this.treasures.push(treasure)
  }
}

module.exports = Room
