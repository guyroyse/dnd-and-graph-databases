import graph from './redis-executor.js'

async function saveDungeon(dungeon) {
  let query = `
    CREATE (d:dungeon)
    SET d.name = $name
    RETURN id(d)`
  let values = await graph.executeAndReturnSingle(query, { name: dungeon.name })
  dungeon.id = values[0]
}

async function saveRoom(room) {
  let query = `
    CREATE (r:room)
    SET r.name = $name
    RETURN id(r)`
  let values = await graph.executeAndReturnSingle(query, { name: room.name })
  room.id = values[0]
}

async function saveMonster(monster) {
  let query = `
    CREATE (m:monster)
    SET m.name = $name, m.cr = $cr, m.xp = $xp
    RETURN id(m)`
  let values = await graph.executeAndReturnSingle(query, { 
    name: monster.name, cr: monster.cr, xp: monster.xp })
  monster.id = values[0]
}

async function saveTreasureItem(treasure) {
  let query = `
    CREATE (t:treasure)
    SET t.name = $name, t.gp = $gp
    RETURN id(t)`
  let values = await graph.executeAndReturnSingle(query, { 
    name: treasure.name, gp: treasure.gp })
  treasure.id = values[0]
}

async function addEntrance(dungeon, room) {
  let query = `
    MATCH (d:dungeon) WHERE id(d) = $dungeonId
    MATCH (r:room) WHERE id(r) = $roomId
    CREATE (d)-[:has_entrance]->(r)`
  await graph.execute(query, { dungeonId: dungeon.id, roomId: room.id })
}

async function addExit(dungeon, room) {
  let query = `
    MATCH (d:dungeon) WHERE id(d) = $dungeonId
    MATCH (r:room) WHERE id(r) = $roomId
    CREATE (r)-[:has_exit]->(d)`
  await graph.execute(query, { dungeonId: dungeon.id, roomId: room.id })
}

async function addMonsterToRoom(room, monster) {
  let query = `
    MATCH (r:room) WHERE id(r) = $roomId
    MATCH (m:monster) WHERE id(m) = $monsterId
    CREATE (r)-[:contains]->(m)`
  await graph.execute(query, { roomId: room.id, monsterId: monster.id })
}

async function addTreasureToRoom(room, treasure) {
  let query = `
    MATCH (r:room) WHERE id(r) = $roomId
    MATCH (t:treasure) WHERE id(t) = $treasureId
    CREATE (r)-[:contains]->(t)`
  await graph.execute(query, { roomId: room.id, treasureId: treasure.id })
}

async function connectRooms(from, to) {
  let query = `
    MATCH (from:room) WHERE id(from) = $fromId
    MATCH (to:room) WHERE id(to) = $toId
    CREATE (from)-[:leads_to]->(to)`
  await graph.execute(query, { fromId: from.id, toId: to.id })
}


export default {
  saveDungeon, saveRoom, saveMonster, saveTreasureItem,
  addEntrance, addExit, connectRooms, addMonsterToRoom, addTreasureToRoom }
