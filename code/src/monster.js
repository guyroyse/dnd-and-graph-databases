import _ from 'lodash'

import rando from './randomizer.js'
import queries from './data/queries.js'

export default class Monster {

  static async generate() {

    let count = Math.max(1, rando.d6() + rando.d6() - 5)
    let name = count === 1
      ? rando.monsterName()
      : `${count} ${rando.monster()}s`

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
