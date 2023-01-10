import fs from "fs/promises"

const start = "//ELECMOD GENERATED CODE//"
const end = "//END ELECMOD GENERATED CODE//"

export class HookedFile {
    constructor(name) {
        this.name = name
        this.text = null
        this.machineLines = []
    }

    async load() {
        this.text = await fs.readFile("extr/" + this.name)
    }

    async hasTouched() {
        if (this.text.includes(start) && this.text.includes(end)) {
            return true
        }
        return false
    }

    async clearInsideText() {
        let s = this.text.indexOf(start) + start.length
        let e = this.text.indexOf(end)
        this.first = this.text.slice(0, s)
        this.last = this.text.slice(e, this.text.length)
    }

    async recompileInsideText() {
        this.text = this.first
        for (let line of this.machineLines) {
            console.log(line)
            this.text += line
        }
        this.text += this.end
    }

    async addToLines(line) {
        this.machineLines.push(line)
    }
}

