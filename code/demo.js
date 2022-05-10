import { Graph as RedisGraph } from 'redisgraph.js'

(async function() {

  const HOST = 'localhost'
  const PORT = 6379

  let graphClient = new RedisGraph('dungeon', HOST, PORT)

  let result = await graphClient.query(
    'match (r:Room) where id(r) = $id return r.name as Name, id(r) as ID',
      { id: 1 }
  )

  console.log(result.getHeader())
  while (result.hasNext()) {
    let record = result.next()
    console.log(record.values())
  }

  graphClient.close()

})()
