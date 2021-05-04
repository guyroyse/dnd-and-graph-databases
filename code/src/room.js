import _ from 'lodash'

import rando from './randomizer.js'
import Monster from './monster.js'
import Treasure from './treasure.js'
import queries from './data/queries.js'

export default class Room {

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
