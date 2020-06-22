const { nameByRace } = require("fantasy-name-generator")

function dungeonName() {
  const adjectives = ["Deep", "Dim", "Gloomy", "Forlorn", "Lonely", "Ruined", 
    "Forgotten", "High", "Fabled"]
  const types = [ "Tower", "Castle", "Keep", "Caves", "Delve", "Fortress",
    "Sewers", "Caverns" ]

  let adjective = pickOne(adjectives)
  let type = pickOne(types)
  let name = fantasyName()

  return `The ${adjective} ${type} of ${name}`
}

function roomName() {
  const adjectives = [ "Big", "Tight", "Narrow", "Grand", "Green", "Blue", "Painted", "Red",
  "Black", "Cavernous", "Dank", "Damp", "Musty", "Dusty", "Abandoned", "Filty", "Vile" ]

  const types = ["Chamber", "Gaol", "Barracks", "Warren", "Den", "Defile", "Pit",
    "Chasm", "Hall", "Bidge", "Stairs", "Room" ]

  let adjective = pickOne(adjectives)
  let type = pickOne(types)

  return `${adjective} ${type}`
}

function fantasyName() {
  const races = [ 'angel', 'cavePerson', 'darkelf', 'demon', 'dragon', 'drow',
    'dwarf', 'elf', 'fairy', 'gnome', 'goblin', 'halfdemon', 'halfling',
    'highelf', 'highfairy', 'human', 'ogre', 'orc' ]
  const genders = [ 'male', 'female' ]

  return nameByRace(pickOne(races), { gender: pickOne(genders) })
}

function pickOne(array) {
  let index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = { dungeonName, roomName }
