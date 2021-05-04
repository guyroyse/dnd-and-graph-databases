import graph from './redis-executor.js'

async function saveDungeon(dungeon) {
  let query = `
    CREATE (d:Dungeon)
    SET d.name = $name
    RETURN id(d)`
  let values = await graph.executeAndReturnSingle(query, { name: dungeon.name })
  dungeon.id = values[0]
}

async function saveRoom(room) {
  let query = `
    CREATE (r:Room)
    SET r.name = $name
    RETURN id(r)`
  let values = await graph.executeAndReturnSingle(query, { name: room.name })
  room.id = values[0]
}

async function saveMonster(monster) {
  let query = `
    CREATE (m:Monster)
    SET m.name = $name, m.cr = $cr, m.xp = $xp
    RETURN id(m)`
  let values = await graph.executeAndReturnSingle(query, { 
    name: monster.name, cr: monster.cr, xp: monster.xp })
  monster.id = values[0]
}

async function saveTreasureItem(treasure) {
  let query = `
    CREATE (t:Treasure)
    SET t.name = $name, t.gp = $gp
    RETURN id(t)`
  let values = await graph.executeAndReturnSingle(query, { 
    name: treasure.name, gp: treasure.gp })
  treasure.id = values[0]
}

async function addEntrance(dungeon, room) {
  let query = `
    MATCH (d:Dungeon) WHERE id(d) = $dungeonId
    MATCH (r:Room) WHERE id(r) = $roomId
    CREATE (d)-[:HAS_ENTRANCE]->(r)`
  await graph.execute(query, { dungeonId: dungeon.id, roomId: room.id })
}

async function addExit(dungeon, room) {
  let query = `
    MATCH (d:Dungeon) WHERE id(d) = $dungeonId
    MATCH (r:Room) WHERE id(r) = $roomId
    CREATE (r)-[:HAS_EXIT]->(d)`
  await graph.execute(query, { dungeonId: dungeon.id, roomId: room.id })
}

async function addMonsterToRoom(room, monster) {
  let query = `
    MATCH (r:Room) WHERE id(r) = $roomId
    MATCH (m:Monster) WHERE id(m) = $monsterId
    CREATE (r)-[:CONTAINS]->(m)`
  await graph.execute(query, { roomId: room.id, monsterId: monster.id })
}

async function addTreasureToRoom(room, treasure) {
  let query = `
    MATCH (r:Room) WHERE id(r) = $roomId
    MATCH (t:Treasure) WHERE id(t) = $treasureId
    CREATE (r)-[:CONTAINS]->(t)`
  await graph.execute(query, { roomId: room.id, treasureId: treasure.id })
}

async function connectRooms(from, to) {
  let query = `
    MATCH (from:Room) WHERE id(from) = $fromId
    MATCH (to:Room) WHERE id(to) = $toId
    CREATE (from)-[:LEADS_TO]->(to)`
  await graph.execute(query, { fromId: from.id, toId: to.id })
}


export default {
  saveDungeon, saveRoom, saveMonster, saveTreasureItem,
  addEntrance, addExit, connectRooms, addMonsterToRoom, addTreasureToRoom }
