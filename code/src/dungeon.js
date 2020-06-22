const { Graph } = require("redisgraph.js")
const redis = require("redis")
const { nameByRace } = require("fantasy-name-generator")
const _ = require("lodash")

const SHAPES = ["square", "circle", "octagon", "hexagon"]
const TYPES = ["Chamber", "Torture Chamber", "Gaol", "Barracks",
  "Warren", "Den", "Delve", "Defile"]

class Dungeon {

  async build() {

    this.open()

    let graph = new Graph("dungeon", this.client)
    graph.deleteGraph()

    let names = []

    for (let i = 0; i < 10; i++) {
      let room = this.randomRoom()
      names.push(room.name)
      await graph.query(`CREATE (:room:bob { name: '${room.name}', shape: '${room.shape}', width: ${room.diameter} })`)
    }

    for (let i = 0; i < 10; i++) {
      let samples = _.sampleSize(names, 2)
      let query = `MATCH (a:room { name: '${samples[0]}' }), (b:room { name: '${samples[1]}' } ) CREATE (a)-[:connects_to]->(b), (b)-[:connects_to]->(a)`
      await graph.query(query)
    }

    await this.close()

  }

  open() {
    this.client = redis.createClient();
  }

  async close() {
    return new Promise(resolve => this.client.quit(() => resolve()))
  }

  randomRoom() {
    return {
      name: this.randomRoomName(),
      shape: this.randomRoomShape(),
      diameter: this.randomRoomDiameter()
    }
  }

  randomRoomDiameter() {
    return Math.floor(Math.random() * 10 + 3) * 5
  }

  randomRoomShape() {
    return _.sample(SHAPES)
  }

  randomRoomName() {
    let type = _.sample(TYPES)
    let name = nameByRace("human")
    return `${type} of ${name}`
  }
}

module.exports = Dungeon
