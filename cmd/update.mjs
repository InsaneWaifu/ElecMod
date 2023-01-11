import { HookedFile } from "./codegen.mjs";
import shell from "shelljs"

shell.cd("extr")

for (let val of ["main", "preload"]) {
    const {default: hookClass} = await import(`../hooks/${val}/hook.js`)
    let hook = new hookClass()
    console.log(hook.shouldCapture())
    let hf = new HookedFile(val + ".js")
    
    await hf.load()
    await hf.clearInsideText()
    await hf.addToLines(`let elecmodRequire = require("esm")(module)`)
    let cphn = "elecmodHook_" + val + ".mjs"
    shell.rm(cphn)
    shell.cp(`../hooks/${val}/hook.js`, cphn)
    await hf.addToLines(`let elecmodImp = elecmodRequire("./${cphn}")`)
    await hf.addToLines(`\nlet elecmodHook = new elecmodImp.default()`)
    await hf.addToLines(`elecmodHook.run(`)
    for (let def of hook.shouldCapture()) {
        hf.addToLines(def + ",")
    }
    hf.addToLines(")")
    await hf.recompileInsideText()
    await hf.save()
}