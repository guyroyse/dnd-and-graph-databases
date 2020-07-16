const _ = require('lodash')

const rando = require('./randomizer')
const Monster = require('./monster')
const Treasure = require('./treasure')
const queries = require('./data/queries')

class Room {

  static async generate() {

    let numberOfMonsters = Math.max(0, rando.d6() - 3)
    let numberOfTreasureItems = Math.max(0, rando.d8() - 5)
    let name = rando.roomName()

    let room = new Room()
    room.name = name
    await queries.saveRoom(room)

    room.addMonsters(numberOfMonsters)
    room.addTreasureItems(numberOfTreasureItems)

    return room
  }

  async addMonsters(number) {
    this.monsters = await Promise.all(
      _(number)
        .times(async _ => {
          let monster = await Monster.generate()
          await queries.addMonsterToRoom(this, monster)
        }))
  }

  async addTreasureItems(number) {
    this.treasures = await Promise.all(
      _(number)
        .times(async _ => {
          let treasure = await Treasure.generate()
          await queries.addTreasureToRoom(this, treasure)
        }))
  }
}

module.exports = Room
