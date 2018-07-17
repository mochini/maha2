import { info } from '../../../utils/console'
import glob from 'glob'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const rootPath = path.resolve()

const scriptPath = path.join(rootPath, 'build', 'index.js')

class MahaScriptPlugin {

  constructor() {}

  apply(compiler) {

    const compile = async (file = null) => {

      if(file && !file.match(/^.*\.js$/)) return

      if(file) info('wdm', `Detected change in ${file.replace(`${rootPath}/`, '')}`)

      const scripts = glob.sync('packages/**/src/admin/ui/**/*.js')

      const reducers = []

      const routes = []

      const badges = []

      const userTasks = []

      const userFields = []

      const userValues = []

      const template = fs.readFileSync(path.join(__dirname, 'index.js.ejs'), 'utf8')

      const data = ejs.render(template, { reducers, routes, badges, userTasks, userFields, userValues })

      fs.writeFileSync(scriptPath, data, 'utf8')

    }

    compiler.hooks.afterEnvironment.tap('MahaScriptPlugin', compile)

    compiler.hooks.invalid.tap('MahaScriptPlugin', compile)

  }

}

export default MahaScriptPlugin
