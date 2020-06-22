const Rando = require('./randomizer')
const graph = require('./redis-executor')

class Room {

  static async generate() {
    let room = new Room()
    room.name = Ranod.roomName()

    await room.save()

    return room
  }

  async save() {
    await graph.execute("CREATE (r:room) SET r.name = $name", this)
  }

}

//   let names = []

//   for (let i = 0; i < 10; i++) {
//     let room = this.randomRoom()
//     names.push(room.name)
//     await graph.query(`CREATE (:room { name: '${room.name}', shape: '${room.shape}', width: ${room.diameter} })`)
//   }

//   for (let i = 0; i < 10; i++) {
//     let samples = _.sampleSize(names, 2)
//     let query = `MATCH (a:room { name: '${samples[0]}' }), (b:room { name: '${samples[1]}' } ) CREATE (a)-[:connects_to]->(b), (b)-[:connects_to]->(a)`
//     await graph.query(query)
//   }

//   await this.close()

// }

// randomRoom() {
//   return {
//     name: this.randomRoomName(),
//     shape: this.randomRoomShape(),
//     diameter: this.randomRoomDiameter()
//   }
// }

// randomRoomDiameter() {
//   return Math.floor(Math.random() * 10 + 3) * 5
// }

// randomRoomShape() {
//   return _.sample(SHAPES)
// }

// randomRoomName() {
//   let type = _.sample(TYPES)
//   let name = nameByRace("orc", { gender: "male" })
//   return `${type} of ${name}`
// }

module.exports = Room
