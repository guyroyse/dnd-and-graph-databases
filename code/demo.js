import { createClient } from 'redis'

const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()


let result = await client.graph.query('dungeon', `
  MATCH (r:Room)
  WHERE id(r) = 1
  RETURN
    r.name AS Name,
    id(r) AS Id`)

console.log(result)

await client.quit()
