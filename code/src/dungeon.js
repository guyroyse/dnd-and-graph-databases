const Rando = require('./randomizer')
const graph = require('./redis-executor')

class Dungeon {

  static async generate() {
    let dungeon = new Dungeon()
    dungeon.name = Rando.dungeonName()

    await dungeon.save()

    return dungeon
  }

  async save() {
    await graph.execute("CREATE (d:dungeon) SET d.name = $name", this)
  }

}

module.exports = Dungeon
