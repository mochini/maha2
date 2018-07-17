import { info, error } from './console'
import { spawn } from 'child_process'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const root = path.resolve()

const sectionPaths = ['apps']

const serverWatch = (entity, watchPaths, command) => {

  const proc = spawn('nodemon', [
    path.join(__dirname,'..','bin','cli.js'),
    ..._.castArray(command),
    '--quiet',
    ...sectionPaths.reduce((items, section) => [
      ...items,
      ...fs.readdirSync(path.join(root, section)).reduce((items, item) => {
        return [
          ...items,
          _.castArray(watchPaths).reduce((items, watchPath) => {
            if(!fs.existsSync(path.join(root, section, item, watchPath))) return items
            return [
              ...items,
              '--watch',
              path.join(root, section, item, watchPath),
            ]
          }, [])
        ]
      }, []),
    ], []),
    '--exec',
    'babel-node',
    '--color'
  ], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  })

  proc.on('message', function (event) {
    if (event.type === 'start') {
      info(entity, `Compiled successfully`)
    } else if (event.type === 'restart') {
      info(entity, `Detected change in ${event.data[0].replace(`${root}/`, '')}`)
    }
  })

  proc.stdout.on('data', function (data) {
    process.stdout.write(data.toString())
  })

  proc.stderr.on('data', function (err) {
    error(entity, `${err}`)
  })

}

export default serverWatch
