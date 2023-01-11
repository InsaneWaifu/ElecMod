export default class {
    shouldCapture() {
        return ["dialog"]
    }

    // Any values the script can access that are specified in the return value of shouldCapture() are passed as constructor arguments
    run(dialog) {
        setTimeout(() => {
            dialog.showMessageBox({
                message: "hello mane"
            })
        }, 1000)
    }

    constructor() {

    }
}
// Do not run mod code here as this script will be imported while generating the code for the asar