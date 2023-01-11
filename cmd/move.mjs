import conf from "../buildconfig.mjs"
import shell from "shelljs"

if (conf.shouldReplace) {
    shell.cp("out.asar", conf.replace)
}