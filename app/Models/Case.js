import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"



export class Case {
  constructor(data) {
    this.id = generateId()
    this.report = data.report || 'no report'
    this.clearance = data.clearance
    this.agency = data.agency
    this.date = data.date ? new Date(data.date) : new Date()
    this.unlocked = false
  }

  get ListTemplate() {
    return `
  <div class="col-12 p-2 selectable" onclick="app.casesController.setActive('${this.id}')">
    <div class="row">
      <div class="col-1">${this.agency}</div>
      <div class="col-7">${this.ComputeTitle}</div>
      <div class="col-3">${this.ComputeDate}</div>
    </div>
  </div>
    `
  }

  get ActiveTemplate() {
    return `
    <div class="col-8">${this.agency} ${this.clearance}</div>
    <div class="col-4">
      <button class="btn btn-info" onclick="app.casesController.saveCase()"><i class="mdi mdi-content-save"></i></button>
      <button class="btn btn-danger"><i class="mdi mdi-delete"></i></button>
    </div>
    <div class="col-12">${this.ComputeFullDate}</div>
    <textarea class="col-10 report" name="" id="" cols="30" rows="10" onblur="app.casesController.saveCase()">${this.report}</textarea>
    `
  }

  get ClassifiedTemplate() {
    return `
    <div class="col-8">${this.agency} ${this.clearance}</div>
    <div class="col-4">
      <button class="btn btn-info" onclick="app.casesController.unlockCase()"><i class="mdi mdi-pencil"></i></button>
      <button class="btn btn-danger"><i class="mdi mdi-delete"></i></button>
    </div>
    <div class="col-12">${this.ComputeFullDate}</div>
    <textarea class="col-10 report" name="" id="" cols="30" rows="10" readonly >${this.ComputeClassifiedReport}</textarea>
    `
  }

  get ComputeTitle() {
    if (this.report) {
      return this.report.slice(0, 15) + '...'
    } else {
      return 'no report'
    }
  }

  get ComputeDate() {
    // NOTE sometimes to get exactly what you want you just gotta compute it
    let date = this.date
    return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear()
  }

  get ComputeFullDate() {
    // .toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    return this.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
  }

  get ComputeClassifiedReport() {
    let reportArr = this.report.split(' ')
    // NOTE takes original array and duplicates it formatting or changing as it goes
    let redactedArr = reportArr.map(word => {
      if (appState.classifiedWords.includes(word.toLowerCase())) {
        return '⬛⬛⬛⬛'
      } else {
        return word
      }
    })
    return redactedArr.join(' ')
  }

}