import { appState } from "../AppState.js"
import { Case } from "../Models/Case.js"
import { saveState } from "../Utils/Store.js";



class CasesService {

  createCase(caseData) {
    console.log('case data in service', caseData);
    const newCase = new Case(caseData)
    appState.cases = [...appState.cases, newCase]
    newCase.unlocked = true
    appState.activeCase = newCase
    saveState('cases', appState.cases)
  }

  setActive(id) {
    console.log('set active service', id);
    const activeCase = appState.cases.find(c => c.id == id)
    appState.activeCase = activeCase
  }

  unlockCase(input) {
    let activeCase = appState.activeCase
    let password = appState.clearanceLevels[activeCase.clearance]
    if (password == '' || input == password) {
      console.log('you got it');
      activeCase.unlocked = true
      appState.emit('activeCase')
    } else {
      console.log("we've tracked your ip, don't go anywhere");
    }
  }
  saveCase(newReport) {
    let activeCase = appState.activeCase
    activeCase.unlocked = false
    activeCase.report = newReport
    appState.emit('activeCase')
    saveState('cases', appState.cases)
  }
}

export const casesService = new CasesService()