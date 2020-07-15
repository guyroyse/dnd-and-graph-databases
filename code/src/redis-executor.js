const RedisGraph = require('redisgraph.js').Graph

let graphClient

function open() {
  if (!graphClient) {
    graphClient = new RedisGraph('dungeon', 'localhost', 6379, { password: 'foobared' })
    graphClient.deleteGraph()
  }
}

function close() {
  graphClient.close()
}

async function execute(query, parameters) {
  await graphClient.query(query, parameters)
}

async function executeAndReturnSingle(query, parameters) {
  let result = await graphClient.query(query, parameters)
  if (result.hasNext() === false) return null
  
  let record = result.next()
  if (record.size() <= 0) return null

  return record.values()
}

async function executeAndReturnMany(query, parameters) {
  let result = await graphClient.query(query, parameters)

  let valueSet = []
  while (result.hasNext()) {
    let record = result.next()
    if (record.size() > 0) {
      valueSet.push(record.values())
    }
  }

  return valueSet
}

module.exports = { open, close, execute, executeAndReturnSingle, executeAndReturnMany }
