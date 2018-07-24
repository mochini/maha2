import { info } from '../../../utils/console'
import glob from 'glob'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const rootPath = path.resolve()

class MahaCompilerPlugin {

  constructor(name) {
    this.name = name
  }

  apply(compiler) {

    const compileScripts = async (file = null) => {

      if(file && !file.match(/^.*\.js$/)) return

      if(file) info(this.name, `Detected change in ${file.replace(`${rootPath}/`, '')}`)

      const reducers = [
        ...glob.sync('packages/**/reducer.js'),
        ...glob.sync('apps/*/admin/ui/components/reducer.js')
      ].map(file => ({
        module: file.split('/')[1],
        name: file.match(/([\w_]*)\/reducer.js$/)[1],
        filepath: file.match(/^(.*)\/reducer.js$/)[1]
      }))

      const routes = [
        ...glob.sync('apps/*/admin/ui/routes.js')
      ].map(filepath => ({
        name: filepath.match(/([\w_]*)\/admin\/ui\/routes.js$/)[1],
        filepath
      }))

      const badges = [
        ...glob.sync('apps/*/admin/ui/badges.js')
      ].map(filepath => ({
        name: filepath.match(/([\w_]*)\/admin\/ui\/badges.js$/)[1],
        filepath
      }))

      const userTasks = [
        ...glob.sync('apps/*/admin/ui/user_tasks.js')
      ].map(filepath => ({
        name: filepath.match(/([\w_]*)\/admin\/ui\/user_tasks.js$/)[1],
        filepath
      }))

      const userFields = [
        ...glob.sync('apps/*/admin/ui/user_fields.js')
      ].map(filepath => ({
        name: filepath.match(/([\w_]*)\/admin\/ui\/user_fields.js$/)[1],
        filepath
      }))

      const userValues = [
        ...glob.sync('apps/*/admin/ui/user_values.js')
      ].map(filepath => ({
        name: filepath.match(/([\w_]*)\/admin\/ui\/user_values.js$/)[1],
        filepath
      }))

      const template = fs.readFileSync(path.join(__dirname, 'index.js.ejs'), 'utf8')

      const data = ejs.render(template, { reducers, routes, badges, userTasks, userFields, userValues })

      fs.writeFileSync(path.join(rootPath, 'build', `${this.name}.js`), data, 'utf8')

    }

    const compileStyles = (file) => {

      if(file && !file.match(/^.*\.less/)) return

      if(file) info(this.name, `Detected change in ${file.replace(`${rootPath}/`, '')}`)

      const styles = [
        ...glob.sync('packages/**/style.less'),
        ...glob.sync('apps/*/admin/**/style.less')
      ].map(style => path.resolve(style))

      const template = fs.readFileSync(path.join(__dirname, 'index.less.ejs'), 'utf8')

      const data = ejs.render(template, { styles })

      fs.writeFileSync(path.join(rootPath, 'build', `${this.name}.less`), data, 'utf8')

    }

    compiler.hooks.environment.tap('MahaCompilerPlugin', () => info(this.name, 'Compiling UI...'))

    compiler.hooks.afterEnvironment.tap('MahaCompilerPlugin', compileScripts)

    compiler.hooks.afterEnvironment.tap('MahaCompilerPlugin', compileStyles)

    compiler.hooks.invalid.tap('MahaCompilerPlugin', compileScripts)

    compiler.hooks.invalid.tap('MahaCompilerPlugin', compileStyles)

    compiler.hooks.done.tap('MahaCompilerPlugin', () => info(this.name, 'Finished compiling UI'))

  }

}

export default MahaCompilerPlugin
