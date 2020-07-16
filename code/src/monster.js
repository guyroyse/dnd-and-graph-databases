const _ = require('lodash')

const rando = require('./randomizer')
const queries = require('./data/queries')

class Monster {

  static async generate() {

    let count = Math.max(1, rando.d6() + rando.d6() - 5)
    let name = rando.monsterName(count)
    let cr = rando.d10() + count
    let xp = rando.d6() * cr

    let monster = new Monster()
    monster.name = name
    monster.cr = cr
    monster.xp = xp
    await queries.saveMonster(monster)

    return monster
  }
}

module.exports = Monster
