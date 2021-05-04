import { Graph as RedisGraph } from 'redisgraph.js'

const HOST = process.env.REDIS_GRAPH_HOST || 'localhost'
const PORT = process.env.REDIS_GRAPH_PORT || 6379
const PASSWORD = process.env.REDIS_GRAPH_PASSWORD || 'foobared'

let graphClient

function open(key) {
  if (!graphClient) {
    graphClient = new RedisGraph(key, HOST, PORT, { password: PASSWORD })
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

export default { open, close, execute, executeAndReturnSingle, executeAndReturnMany }
