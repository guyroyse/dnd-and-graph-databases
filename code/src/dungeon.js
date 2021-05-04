import _ from 'lodash'

import rando from './randomizer.js'
import Room from './room.js'
import queries from './data/queries.js'

export default class Dungeon {

  static async generate() {

    let numberOfEntrances = rando.d3()
    let numberOfExits = rando.d3()
    let numberOfRooms = 10 + rando.d20()
    let name = rando.dungeonName()

    let dungeon = new Dungeon()
    dungeon.name = name
    await queries.saveDungeon(dungeon)

    await dungeon.addRooms(numberOfRooms)
    await dungeon.addEntrances(numberOfEntrances)
    await dungeon.addExits(numberOfExits)
    await dungeon.connectRooms()

    return dungeon
  }

  async addRooms(number) {
    this.rooms = await Promise.all(
      _(number)
        .times(async __ => await Room.generate()))
  }

  async addEntrances(number) {
    this.entrances = await Promise.all(
      _(this.rooms)
        .sampleSize(number)
        .map(async room => await queries.addEntrance(this, room)))
  }

  async addExits(number) {
    this.exits = await Promise.all(
      _(this.rooms)
        .sampleSize(number)
        .map(async room => await queries.addExit(this, room)))
  }

  async connectRooms() {
    await Promise.all(
      _(this.rooms)
        .map(async room => await this.connectRoom(room)))
  }

  async connectRoom(room) {
    let numberOfDoors = rando.d3()
    await Promise.all(
      _(numberOfDoors)
        .times(async __ => {
          let to = _(this.rooms).sample()
          await this.connectTwoRooms(room, to)
        }))
  }

  async connectTwoRooms(from, to) {
    let isOneWay = rando.d8() === 1
    await queries.connectRooms(from, to)
    if (!isOneWay) {
      await queries.connectRooms(to, from)
    }
  }
}
