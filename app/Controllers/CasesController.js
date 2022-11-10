import { appState } from "../AppState.js";
import { casesService } from "../Services/CasesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawCases() {
  let cases = appState.cases
  let template = ''
  cases.forEach(c => template += c.ListTemplate)
  setHTML('case-list', template)
}

function _drawActiveCase() {
  let activeCase = appState.activeCase
  console.log('drawing active', activeCase);
  if (activeCase.unlocked) {
    setHTML('active-case', activeCase.ActiveTemplate)
  } else {
    setHTML('active-case', activeCase.ClassifiedTemplate)
  }
}

export class CasesController {
  constructor() {
    console.log('cases controller loaded');
    appState.on('cases', _drawCases)
    appState.on('activeCase', _drawActiveCase)
    // NOTE things in the constructor basically run on load
    _drawCases()
  }


  createCase() {
    window.event.preventDefault()
    console.log('creating case');
    const form = window.event.target
    let caseData = getFormData(form)
    console.log(caseData);
    casesService.createCase(caseData)
    // @ts-ignore
    form.reset()
  }

  setActive(id) {
    console.log('setting active', id);
    casesService.setActive(id)
  }

  async unlockCase() {
    let input = ''
    if (appState.activeCase.clearance != 'none') {
      input = await Pop.prompt('password', true)
    }
    casesService.unlockCase(input)
    document.querySelector('.report').focus()
  }

  saveCase() {
    let newReport = document.querySelector('.report')
    console.log(newReport.value);
    // @ts-ignore
    casesService.saveCase(newReport.value)
  }
}

