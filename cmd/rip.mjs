import { HookedFile } from "./codegen.mjs";
import shell from "shelljs"
import fs from "fs"
import readline from 'readline'
import * as Diff from 'diff'
import path from 'path'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.warn("Warning: This will overwrite files in the patches/ directory.")

await new Promise((resolve) => {
    rl.question("Press enter to continue", () => {
        resolve()
    })
})

const ignore = [
    /elecmod.*/,
    /node_modules\/esm.*/
]


function didFileExist(name) {
    return fs.existsSync("../extr_backup/" + name)
}
function loadOld(name) {
    return fs.readFileSync("../extr_backup/" + name, "utf-8")
}


shell.cd("extr")

let patched = []
let newed = []

eachfile:
for (let file of shell.ls("-RA")) {
    for (let toIgnore of ignore) {
        if (file.match(toIgnore)) {
            continue eachfile
        }
    }
    let stats = fs.statSync(file)
    if (stats.isDirectory()) {
        continue
    }

    if (!didFileExist(file)) {
        if (file.includes("/")) {
            // file is in a subdir
            shell.mkdir("-p", "../patches/new/" + path.dirname(file))
        }
        console.log("New file: " + file)
        shell.cp(file, "../patches/new/" + file)
        newed.push(file)
    } else {
        // lets get the file without the patches applied
        let hf = new HookedFile(file)
        await hf.load()
        let text = hf.text
        let otext = loadOld(file)
        if (text != otext) {
            if (file.includes("/")) {
                // file is in a subdir
                shell.mkdir("-p", "../patches/patch/" + path.dirname(file))
            }
            let pt = Diff.createPatch(file, otext, text)
            shell.echo(pt).to("../patches/patch/" + file + ".patch")
            patched.push(file + ".patch")
        }
    }
}

shell.cd("../patches/new")

for (let file of shell.ls("-RA")) {
    if (!newed.includes(file)) {
        console.warn(`Warning! File ${file} exists in patches/new but not in extracted asar`)
    }
}

shell.cd("../patch")
for (let file of shell.ls("-RA")) {
    let stats = fs.statSync(file)
    if (stats.isDirectory()) {
        continue
    }
    if (!patched.includes(file)) {
        console.warn(`Warning! Patch ${file} exists in patches/patch but no changes to that file were made in extracted asar!`)
    }
}

process.exit(0)