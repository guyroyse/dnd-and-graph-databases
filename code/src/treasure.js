const _ = require('lodash')

const graph = require('./redis-executor')
const rando = require('./randomizer')

class Treasure {

  static async generate() {

    let name = rando.itemName()
    let gp = rando.d10() * rando.d10() * 25

    let treasure = new Treasure()
    await treasure.save(name, gp)

    return treasure
  }

  async save(name, gp) {
    let query = `
      CREATE (t:treasure) SET t.name = $name, t.gp = $gp
      RETURN id(t), t.name, t.gp`
    let values = await graph.executeAndReturnSingle(query, { name, gp })
    this.id = values[0]
    this.name = values[1]
    this.gp = values[2]
  }
}

module.exports = Treasure
