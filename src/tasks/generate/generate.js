import { action } from '../../utils/console'
import exec from '../../utils/exec'
import pluralize from 'pluralize'
import moment from 'moment'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import ncp from 'ncp'
import fs from 'fs'

const generatorsPath = path.join(__dirname, '..', '..', 'generators')

const generators = fs.readdirSync(generatorsPath)

export const generate = async (flags, args) => {

  const template = args.template

  const app = args.app

  const name = typeof args.name === 'string' ? args.name : args.app

  if(!_.includes(generators, template)) throw new Error(`'${template}' is not a valid template`)

  const config = getConfig(app)

  const data = getData(template, app, config, name)

  const generatorPath = path.join(generatorsPath, template)

  const generator = require(generatorPath).default

  await Promise.mapSeries(generator.files, async (file) => {

    await generateFile(file, generatorPath, data)

  })

  if(generator.after) await runHooks(generator.after, data)

}

export const destroy = async (...args) => {

  const template = args[0]

  const app = args[1]

  const name = typeof args[2] === 'string' ? args[2] : args[1]

  console.log(`destroy ${template} ${app} ${name}`)


}

const generateFile = async (file, templatesPath, data) => {

  if(file.action === 'copy') return await copyItem(file, templatesPath, data)

  if(file.action === 'create') return await createFile(file, templatesPath, data)

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

const copyItem = async (file, templatesPath, data) => {

  const srcPath = ejs.render(path.join(templatesPath, file.src), data)

  const destPath = ejs.render(path.join(file.dest), data)

  action('copy', destPath)

  await Promise.promisify(ncp)(path.resolve(srcPath), path.resolve(destPath))

}

const createFile = (file, templatesPath, data) => {

  const renderedPath = ejs.render(file.filepath, data)

  const filepath = path.join(data.root, renderedPath)

  makeDirectory(filepath, data)

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
    root: '',
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

    await exec(hook.command, data.path)

  })

}

export default generate
