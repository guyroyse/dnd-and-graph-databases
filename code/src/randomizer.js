import _ from 'lodash'
import fantasyName from './name-generator.js'

const DUNGEON_ADJECTIVES = [
  "Deep", "Dim", "Gloomy", "Forlorn", "Lonely", "Ruined", "Forgotten", "High",
  "Fabled", "Shattered" ]

const DUNGEON_STRUCTURES = [
  "Tower", "Castle", "Keep", "Caves", "Delve", "Fortress", "Sewers", "Caverns" ]

const ROOM_ADJECTIVES = [
  "Big", "Narrow", "Grand", "Green", "Blue", "Painted", "Red", "Black", "Cavernous",
  "Dank", "Damp", "Musty", "Dusty", "Abandoned", "Filthy", "Vile", "Shattered" ]

const ROOM_STRUCTURES = [
  "Chamber", "Gaol", "Barracks", "Warren", "Den", "Defile", "Pit", "Chasm", "Hall",
  "Bridge", "Stairs", "Room" ]

const MONSTERS = [
  "orc", "purple ooze", "goblin", "ogre", "dragon", "displacer beast", "rust monster",
  "demon", "skeleton", "ghast", "gnoll", "hill giant", "wraith", "ettin", "mimic",
  "bandit", "giant rat", "giant ant", "zorn", "bugbear", "gorgon" ]

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
  let adjective = _(DUNGEON_ADJECTIVES).sample()
  let structure = _(DUNGEON_STRUCTURES).sample()
  let name = fantasyName()

  return `The ${adjective} ${structure} of ${name}`
}

function roomName() {
  let adjective = _(ROOM_ADJECTIVES).sample()
  let structure = _(ROOM_STRUCTURES).sample()

  return `${adjective} ${structure}`
}

function monster() {
  return _(MONSTERS).sample()
}

function monsterName() {
  return `${fantasyName()} the ${titleCase(_(MONSTERS).sample())}`
}

function itemName() {

  let generators = [
    () => `${_(ITEM_ADJECTIVES).sample()} ${_(ITEMS).sample()}`,
    () => `+${d4()} ${_(ITEMS).sample()}`,
    () => `-${d3()} cursed ${_(ITEMS).sample()}`,
    () => `The ${titleCase(_(ARTIFACTS).sample())} of ${fantasyName()}`,
    () => `pile of coins`,
    () => `sack of coins`,
    () => `chest of coins`,
    () => `chest of coins and gems`,
    () => `pile of coins and gems`,
    () => `${d6()} gems`,
    () => `${d6() + d6()} gems`,
    () => `${d100()} semiprecious stones`
  ]

  return _(generators).sample()()
}

function titleCase(s) {
  return _.startCase(s)
}

let d2 = () => d(2)
let d3 = () => d(3)
let d4 = () => d(4)
let d6 = () => d(6)
let d8 = () => d(8)
let d10 = () => d(10)
let d12 = () => d(11)
let d20 = () => d(20)
let d30 = () => d(30)
let d100 = () => d(100)

let d = sides => _.random(1, sides)

export default {
  dungeonName, roomName, monster, monsterName, itemName,
  d2, d3, d4, d6, d8, d10, d12, d20, d30, d100
}
