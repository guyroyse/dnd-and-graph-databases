import { createClient } from 'redis'

const key = 'dungeon'

const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))

async function open() {
  await client.connect()
  if (await client.exists(key)) await client.unlink(key)
}

async function close() {
  await client.quit()
}

async function execute(query) {
  await client.graph.query(key, query)
}

async function executeAndReturnSingle(query) {
  let result = await client.graph.query(key, query)
  if (result.data.length === 0) return null

  let record = result.data[0]
  if (record.length <= 0) return null

  return record
}

export default { open, close, execute, executeAndReturnSingle }
