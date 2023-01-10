console.log("Place your file in the current working directory as app.asar")
import readline from "readline"
import {exec} from "child_process"
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
await new Promise((resolve) => {
    rl.question("Press enter to continue", () => {
        resolve()
    })
})


await new Promise((resolve) => {
    exec("npx asar e app.asar extr/", (err, stdout, stderr) => {
        console.log(err, stdout, stderr)
        resolve()
    })
})


process.exit()