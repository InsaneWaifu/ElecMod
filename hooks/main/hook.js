export default class {
  shouldCapture() {
    return ["app"]
  }

  // Any values the script can access that are specified in the return value of shouldCapture() are passed as run arguments
  run(app) {

  }

  constructor() {

  }
}
// Do not run mod code here as this script will be imported while generating the code for the asar