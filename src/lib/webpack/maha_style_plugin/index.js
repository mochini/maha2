import { log } from '../../../utils/console'
import glob from 'glob'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const rootPath = path.resolve()

const stylePath = path.join(rootPath, 'build', 'index.less')

class MahaStylePlugin {

  constructor() {}

  apply(compiler) {

    const create = (file) => {

      if(file && !file.match(/^.*\.less/)) return

      if(file) log('wdm', `Detected change in ${file.replace(`${rootPath}/`, '')}`)

      const styles = glob.sync('apps/**/admin/ui/**/style.less').map(style => {
        return path.resolve(style)
      })

      const template = fs.readFileSync(path.join(__dirname, 'index.less.ejs'), 'utf8')

      const data = ejs.render(template, { styles })

      fs.writeFileSync(stylePath, data, 'utf8')

    }

    compiler.hooks.afterEnvironment.tap('MahaStylePlugin', create)

    compiler.hooks.invalid.tap('MahaStylePlugin', create)

  }

}

export default MahaStylePlugin
