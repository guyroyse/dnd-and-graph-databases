import _ from 'lodash'
import { nameByRace } from 'fantasy-name-generator'

const RACES = [
  'angel', 'cavePerson', 'darkelf', 'demon', 'dragon', 'drow', 'dwarf',
  'elf', 'fairy', 'gnome', 'goblin', 'halfdemon', 'halfling', 'highelf',
  'highfairy', 'human', 'ogre', 'orc' ]

const GENDERS = [ 'male', 'female' ]

export default function fantasyName() {
  return nameByRace(_.sample(RACES), { gender: _.sample(GENDERS) })
}
