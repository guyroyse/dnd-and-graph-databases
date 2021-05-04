import _ from 'lodash'

import rando from './randomizer.js'
import queries from './data/queries.js'

export default class Treasure {

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
