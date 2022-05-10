import graph from './redis-executor.js'

async function saveDungeon(dungeon) {
  let query = `
    CREATE (d:Dungeon)
    SET
      d.name = '${dungeon.name}'
    RETURN id(d) AS dungeonId`
  let values = await graph.executeAndReturnSingle(query)
  dungeon.id = values[0]
}

async function saveRoom(room) {
  let query = `
    CREATE (r:Room)
    SET
      r.name = '${room.name}'
    RETURN id(r) AS roomId`
  let values = await graph.executeAndReturnSingle(query)
  room.id = values[0]
}

async function saveMonster(monster) {
  let query = `
    CREATE (m:Monster)
    SET
      m.name = '${monster.name}',
      m.cr = ${monster.cr},
      m.xp = ${monster.xp}
    RETURN id(m) AS monsterId`
  let values = await graph.executeAndReturnSingle(query)
  monster.id = values[0]
}

async function saveTreasureItem(treasure) {
  let query = `
    CREATE (t:Treasure)
    SET
      t.name = '${treasure.name}',
      t.gp = ${treasure.gp}
    RETURN id(t) AS treasureId`
  let values = await graph.executeAndReturnSingle(query)
  treasure.id = values[0]
}

async function addEntrance(dungeon, room) {
  let query = `
    MATCH (d:Dungeon) WHERE id(d) = ${dungeon.id}
    MATCH (r:Room) WHERE id(r) = ${room.id}
    CREATE (d)-[:HAS_ENTRANCE]->(r)`
  await graph.execute(query)
}

async function addExit(dungeon, room) {
  let query = `
    MATCH (d:Dungeon) WHERE id(d) = ${dungeon.id}
    MATCH (r:Room) WHERE id(r) = ${room.id}
    CREATE (r)-[:HAS_EXIT]->(d)`
  await graph.execute(query)
}

async function addMonsterToRoom(room, monster) {
  let query = `
    MATCH (r:Room) WHERE id(r) = ${room.id}
    MATCH (m:Monster) WHERE id(m) = ${monster.id}
    CREATE (r)-[:CONTAINS]->(m)`
  await graph.execute(query)
}

async function addTreasureToRoom(room, treasure) {
  let query = `
    MATCH (r:Room) WHERE id(r) = ${room.id}
    MATCH (t:Treasure) WHERE id(t) = ${treasure.id}
    CREATE (r)-[:CONTAINS]->(t)`
  await graph.execute(query)
}

async function connectRooms(from, to) {
  let query = `
    MATCH (from:Room) WHERE id(from) = ${from.id}
    MATCH (to:Room) WHERE id(to) = ${to.id}
    CREATE (from)-[:LEADS_TO]->(to)`
  await graph.execute(query)
}


export default {
  saveDungeon, saveRoom, saveMonster, saveTreasureItem,
  addEntrance, addExit, connectRooms, addMonsterToRoom, addTreasureToRoom }
