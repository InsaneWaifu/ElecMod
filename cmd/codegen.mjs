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
        this.text = await fs.readFile(this.name, 'utf-8')
    }

    async hasTouched() {
        if (this.text.includes(start) && this.text.includes(end)) {
            return true
        }
        return false
    }

    async clearInsideText() {
        if (!await this.hasTouched()) {
            this.text += "\n"
            this.text += start
            this.text += "\n"
            this.text += end
            this.text += "\n"
        } else {
        }
        let s = this.text.indexOf(start) + start.length
        let e = this.text.indexOf(end)
        this.first = this.text.slice(0, s)
        this.last = this.text.slice(e)
    }

    async recompileInsideText() {
        this.text = this.first
        this.text += "\n"
        for (let line of this.machineLines) {
            this.text += line + "\n"
        }
        this.text += this.last
    }

    async addToLines(line) {
        this.machineLines.push(line)
    }


    async save() {
        await fs.writeFile(this.name, this.text)
    }
}

