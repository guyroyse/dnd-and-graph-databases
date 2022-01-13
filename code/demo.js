import { Graph as RedisGraph } from 'redisgraph.js'

(async function() {

  const HOST = 'localhost'
  const PORT = 6379
  const PASSWORD = 'foobared'

  let graphClient = new RedisGraph('dungeon', HOST, PORT, { password: PASSWORD })

  let result = await graphClient.query(
    'match (r:Room) return r.name', {}
  )

  console.log(result.getHeader())
  while (result.hasNext()) {
    let record = result.next()
    console.log(record.values())
  }

  graphClient.close()

})()
