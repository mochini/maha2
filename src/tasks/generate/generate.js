import { action } from '../../utils/console'
import exec from '../../utils/exec'
import pluralize from 'pluralize'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

const generatorsPath = path.join(__dirname, '..', '..', 'generators')

const generators = fs.readdirSync(generatorsPath)

export const generate = async (...args) => {

  const template = args[0]

  const app = args[1]

  const name = typeof args[2] === 'string' ? args[2] : args[1]

  if(!_.includes(generators, template)) throw new Error('invalid template')

  const config = getConfig(app)

  const data = getData(template, app, config, name)

  const generatorPath = path.join(generatorsPath, template)

  const generator = require(generatorPath).default

  generator.files.map(file => generateFile(file, generatorPath, data))

  // if(generator.afters) await runHooks(generator.after, data)

}

export const destroy = async (...args) => {

  const template = args[0]

  const app = args[1]

  const name = typeof args[2] === 'string' ? args[2] : args[1]

  console.log(`destroy ${template} ${app} ${name}`)


}

const generateFile = (file, templatesPath, data) => {

  const renderedPath = ejs.render(file.filepath, data)

  const filepath = path.join(data.root, renderedPath)

  makeDirectory(filepath, data)

  if(file.action === 'create') createFile(file, filepath, templatesPath, data)

}

const makeDirectory = (filepath, data) => {

  path.dirname(filepath).split('/').reduce((fullPath, segment) => {

    const joinedPath = path.join(fullPath, segment)

    if(fs.existsSync(joinedPath)) return joinedPath

    action('mkdir', joinedPath)

    fs.mkdirSync(joinedPath)

    return joinedPath

  }, '')

}

const createFile = (file, filepath, templatesPath, data) => {

  if(fs.existsSync(filepath)) return action('identical', filepath)

  const rendered = getRendered(file, templatesPath, data)

  action('create', filepath)

  fs.writeFileSync(filepath, rendered)

}

const getConfig = (app) => {

  const appConfigFilePath = path.resolve('apps', app, 'app.js')

  return fs.existsSync(appConfigFilePath) ? require(appConfigFilePath).default.config : null

}

const getData = (template, app, config, initname) => {

  const parts = initname.split('/').map(_.snakeCase)

  const name = parts[parts.length - 1]

  const app_name = _.includes(['platform','app'], template) ? _.kebabCase(name) : config.title

  return {
    _,
    pluralize,
    moment,
    app,
    name,
    app_name,
    root: path.join('apps', app),
    path: parts.join('/')
  }

}


const getRendered = (file, templatesPath, data) => {

  if(file.template) {

    const templateFilePath = path.join(templatesPath, file.template)

    const template = fs.readFileSync(templateFilePath, 'utf8')

    return ejs.render(template, data)

  }

  if(file.content) return ejs.render(file.content, data)

  return ''

}

const runHooks = async (hooks, data) => {

  return await Promise.mapSeries(hooks, async (hook) => {

    action('exec', hook.description)

    await exec(hook.command, `${data.root}/${data.path}`)

  })

}

export default generate
