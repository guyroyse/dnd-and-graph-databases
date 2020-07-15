const graph = require('./redis-executor')
const rando = require('./randomizer')

class Monster {

  static async generate() {
    let count = Math.max(1, rando.d6() + rando.d6() - 5)
    let name = rando.monsterName(count)
    let cr = rando.d10() + count
    let xp = rando.d6() * cr

    let monster = new Monster()
    await monster.save(name, cr, xp)

    return monster
  }

  async save(name, cr, xp) {
    let query = `
      CREATE (m:monster) SET m.name = $name, m.cr = $cr, m.xp = $xp
      RETURN id(m), m.name, m.cr, m.xp`
    let values = await graph.executeAndReturnSingle(query, { name, cr, xp })
    this.id = values[0]
    this.name = values[1]
    this.cr = values[2]
    this.xp = values[3]
  }
}

module.exports = Monster
