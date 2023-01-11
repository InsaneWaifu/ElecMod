import { HookedFile } from "./codegen.mjs";
import shell from "shelljs"
import fs from "fs"
import readline from 'readline'
import * as Diff from 'diff'


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.warn("Warning: This will overwrite ALL files in the extr/ directory that have a patch file corresponding to them.")

function loadOld(name) {
    return fs.readFileSync("../../extr_backup/" + name, "utf-8")
}


await new Promise((resolve) => {
    rl.question("Press enter to continue", () => {
        resolve()
    })
})

shell.cd("patches")
shell.cd("new")
for (let file of shell.ls("-RA")) {
    let stats = fs.statSync(file)
    if (stats.isDirectory()) {
        shell.mkdir("-p", "../../extr/" + file)
        continue
    }
    shell.cp(file, "../../extr/" + file)
}

shell.cd("..")

shell.cd("patch")
for (let file of shell.ls("-RA")) {
    let stats = fs.statSync(file)
    let oth = "../../extr/" + file
    if (stats.isDirectory()) {
        shell.mkdir("-p", oth)
        continue
    }
    if (!file.endsWith(".patch")) {
        continue
    }
    let realname = file.slice(0, -6)
    let og = loadOld(realname)
    let patch = Diff.parsePatch(fs.readFileSync(file, "utf-8"))
    let patched = Diff.applyPatch(og, patch, {
        fuzzFactor: 1
    })
    shell.echo(patched).to("../../extr/" + realname)
}

process.exit(0)