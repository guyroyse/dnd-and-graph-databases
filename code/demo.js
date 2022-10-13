import { createClient } from 'redis'

const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()

let result, query

query = `MATCH (d:Dungeon) RETURN d.name`

result = await client.graph.query('dungeon', query)

console.log(JSON.stringify(result))

query = `
  MATCH (max:Treasure)
    WITH max(max.gp) AS maxgp
  MATCH (r:Room)-[:CONTAINS]->(t:Treasure) WHERE t.gp = maxgp
    WITH id(r) as dest_id
  MATCH (start:Room), (stop:Room)
    WHERE id(start) = 1 AND id(stop) = dest_id
  RETURN shortestPath((start)-[:LEADS_TO*]->(stop))`

result = await client.graph.query('dungeon', query)

console.log(JSON.stringify(result))

await client.quit()
