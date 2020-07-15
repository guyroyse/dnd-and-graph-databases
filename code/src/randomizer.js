const _ = require('lodash')

const fantasyName = require('./name-generator')

const DUNGEON_ADJECTIVES = [
  "Deep", "Dim", "Gloomy", "Forlorn", "Lonely", "Ruined", "Forgotten", "High",
  "Fabled", "Shattered" ]

const DUNGEON_STRUCTURES = [
  "Tower", "Castle", "Keep", "Caves", "Delve", "Fortress", "Sewers", "Caverns" ]

const ROOM_ADJECTIVES = [
  "Big", "Narrow", "Grand", "Green", "Blue", "Painted", "Red", "Black", "Cavernous",
  "Dank", "Damp", "Musty", "Dusty", "Abandoned", "Filty", "Vile", "Shattered" ]

const ROOM_STRUCTURES = [
  "Chamber", "Gaol", "Barracks", "Warren", "Den", "Defile", "Pit", "Chasm", "Hall",
  "Bridge", "Stairs", "Room" ]

const MONSTERS= [
  "orc", "purple ooze", "goblin", "ogre", "dragon", "displacer beast", "rust monster",
  "demon", "skeleton", "ghast", "gnoll", "cyclops", "ettin", "mimic", "bandit",
  "giant rat", "giant ant" ]

  const ITEM_ADJECTIVES = [
    "gilded", "bejeweled", "corroded", "broken", "masterwork", "worn",
    "dwarven", "elven", "fine" ]

  const ITEMS = [
    "leather armor", "studded leather", "scale mail", "breastplate",
    "ring mail", "chain mail", "plate", "shield", "club", "dagger",
    "mace", "quarterstaff", "spear", "shortbow", "sling", "battleaxe",
    "flail", "glaive", "greataxe", "halberd", "lance", "longsword",
    "maul", "morningstar", "pike", "rapier", "scimitar", "shortsword",
    "trident", "warhammer", "whip", "crossbow", "longbow" ]

  const ARTIFACTS = [
    "orb", "chalice", "necklace", "eye", "tome", "wand", "rod", "staff",
    "book", "gem", "sphere", "amulet", "hand", "bracers", "helm", "decanter",
    "armor", "plate", "breastplate", "shield", "dagger", "mace", "spear",
    "bow", "axe", "lance", "trident" ]
 

function dungeonName() {
  let adjective = _.sample(DUNGEON_ADJECTIVES)
  let structure = _.sample(DUNGEON_STRUCTURES)
  let name = fantasyName()

  return `The ${adjective} ${structure} of ${name}`
}

function roomName() {
  let adjective = _.sample(ROOM_ADJECTIVES)
  let structure = _.sample(ROOM_STRUCTURES)

  return `${adjective} ${structure}`
}

function monsterName(count) {
  let name = fantasyName()
  let type = _.sample(MONSTERS)

  return count === 1
    ? `${name} the ${titleCase(type)}`
    : `${count} ${type}s`
}

function itemName() {

  let generators = [
    () => `${_.sample(ITEM_ADJECTIVES)} ${_.sample(ITEMS)}`,
    () => `+${d4()} ${_.sample(ITEMS)}`,
    () => `-${d3()} cursed ${_.sample(ITEMS)}`,
    () => `The ${titleCase(_.sample(ARTIFACTS))} of ${fantasyName()}`,
    () => `pile of coins`,
    () => `sack of coins`,
    () => `chest of coins`,
    () => `chest of coins and gems`,
    () => `pile of coins and gems`,
    () => `${d6()} gems`,
    () => `${d6() + d6()} gems`,
    () => `${d100()} semiprecious stones`
  ]

  return _.sample(generators)()
}

function titleCase(s) {
  return s
    .split(' ')
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

let d3 = () => d(3)
let d4 = () => d(4)
let d6 = () => d(6)
let d8 = () => d(8)
let d10 = () => d(10)
let d12 = () => d(11)
let d20 = () => d(20)
let d30 = () => d(30)
let d100 = () => d(100)

let d = x=> Math.floor(Math.random() * x) + 1

module.exports = {
  dungeonName, roomName, monsterName, itemName,
  d3, d4, d6, d8, d10, d12, d20, d30, d100
}
