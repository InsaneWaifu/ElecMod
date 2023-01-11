console.log("Place your file in the current working directory as app.asar")
import readline from "readline"
import {exec} from "child_process"
import shell from "shelljs"
import { existsSync, fstat } from "fs";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
await new Promise((resolve) => {
    rl.question("Press enter to continue", () => {
        resolve()
    })
})

if (fstat.existsSync("./extr/")) {

    console.log("By extracting again, the extr/ folder and any modifications you have made to the files inside it will be cleared")
    console.log("Your hooks in the hooks/ folder will not be touched and can be reapplied by running npm run update") 
    await new Promise((resolve) => {
        rl.question("Press enter to continue", () => {
            resolve()
        })
    })
    shell.rm("-r", "extr/")
}

shell.mkdir("extr")


shell.exec("npx asar e app.asar extr/")
console.log("Extracted")


shell.cd("extr")

console.log("Adding esm...")
shell.exec("npm add esm")
console.log("Done")

process.exit()