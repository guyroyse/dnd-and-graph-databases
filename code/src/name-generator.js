const _ = require('lodash')
const { nameByRace } = require('fantasy-name-generator')

const RACES = [
  'angel', 'cavePerson', 'darkelf', 'demon', 'dragon', 'drow', 'dwarf',
  'elf', 'fairy', 'gnome', 'goblin', 'halfdemon', 'halfling', 'highelf',
  'highfairy', 'human', 'ogre', 'orc' ]

const GENDERS = [ 'male', 'female' ]

function fantasyName() {
  return nameByRace(_.sample(RACES), { gender: _.sample(GENDERS) })
}

module.exports = fantasyName
