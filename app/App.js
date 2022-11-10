import { CasesController } from "./Controllers/CasesController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {

  casesController = new CasesController()
  // valuesController = new ValuesController();
}

window["app"] = new App();
