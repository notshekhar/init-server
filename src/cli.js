import fs from "fs"
import ncp from "ncp"
import path from "path"
import { promisify } from "util"
import { exec } from "child_process"
import { execArgv } from "process"

const access = promisify(fs.access)
const copy = promisify(ncp)

export async function cli(args) {
    if (args.length > 2) {
        let project_name = args[2]
        const targetDir = path.resolve(process.cwd(), project_name)
        const templateDir = path.resolve(__dirname, "../files")

        if (fs.existsSync(targetDir)) {
            console.log("Directory already exist, try different project name")
            return
        }
        console.log("Creating project ....")
        // console.log(targetDir, templateDir)
        await copy(templateDir, targetDir)
        exec("cd " + project_name, (err, out, outerr) => {
            if (err) console.log(err)
            else if (outerr) console.log(outerr)
            else console.log(out)
        })
        exec("npm i", (err, out, outerr) => {
            if (err) console.log(err)
            else if (outerr) console.log(outerr)
            else console.log(out)
        })
        console.log("Done, now run:")
        console.log(`    'cd ${project_name}'`)
        console.log(`    'node server'`)
        // copy("")
    } else {
        console.log("Please enter the project name")
    }
}
