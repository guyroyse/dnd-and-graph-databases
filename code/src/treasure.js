const _ = require('lodash')

const rando = require('./randomizer')
const queries = require('./data/queries')

class Treasure {

  static async generate() {

    let name = rando.itemName()
    let gp = rando.d10() * rando.d10() * 25

    let treasure = new Treasure()
    treasure.name = name
    treasure.gp = gp
    await queries.saveTreasureItem(treasure)

    return treasure
  }
}

module.exports = Treasure
