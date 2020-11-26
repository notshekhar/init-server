import fs from "fs"
import ncp from "ncp"
import path from "path"
import { promisify } from "util"

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
        console.log("Done, now run:")
        console.log(`    'cd ${project_name}'`)
        console.log(`    'node server'`)
        // copy("")
    } else {
        console.log("Please enter the project name")
    }
}
