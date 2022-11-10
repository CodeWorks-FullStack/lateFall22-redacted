import { Case } from "./Models/Case.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"
import { wordList } from "./WordList.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  clearanceLevels = {
    none: '',
    secret: 'terces!',
    'top secret': 'password456',
    'super top secret': 'Cheeseburgerpizza🍔'
  }

  classifiedWords = ['codeworks', 'alien', 'star', 'bitcoin', 'ufo', 'mole', 'hairy', 'flying', 'roof', 'full-stack', 'classroom', 'humanoid', 'camera', ...wordList]

  // NOTE used before local storage was setup
  // cases = [
  //   new Case({
  //     report: 'A un identified flying object was seen over code works the other day.',
  //     clearance: 'secret',
  //     agency: '👾'
  //   }),
  //   new Case({
  //     report: 'A large hairy chinned humanoid, was seen tripping on camera behind the full-stack classroom',
  //     clearance: 'none',
  //     agency: '🦄'
  //   }),
  //   new Case({
  //     report: 'Mole People living on the roof of the building.',
  //     clearance: 'top secret',
  //     agency: '🏫'
  //   })
  // ]

  cases = loadState('cases', [Case])

  activeCase = null
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
