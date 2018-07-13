// import '../../lib/environment'
import { info, error } from '../../utils/console'
import devServer from 'webpack-dev-server'
import { spawn } from 'child_process'
import config from './webpack.config'
import nodemon from 'nodemon'
import Webpack from 'webpack'
import express from 'express'
import rimraf from 'rimraf'
import path from 'path'
import fs from 'fs'

const root = path.resolve()

const watchPaths = ['apps','packages','plugins']

const removeBuilt = () => rimraf.sync(path.join('build'))

const serverWatch = (entity, watch) => {

  const proc = spawn('nodemon', [
    path.join(__dirname,'..','..','bin','cli.js'),
    'start',
    entity,
    '--quiet',
    ...watchPaths.reduce((items, group) => [
      ...items,
      ...fs.readdirSync(path.join(root, group)).reduce((items, item) => {
        if(!fs.existsSync(path.join(root, group, item, watch))) return items
        return [
          ...items,
          '--watch',
          path.join(root, group, item, watch),
        ]
      }, []),
    ], []),
    '--exec',
    'babel-node'
  ], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  })

  proc.on('message', function (event) {
    if (event.type === 'start') {
      info(entity, `Compiled successfully.`)
    } else if (event.type === 'restart') {
      info(entity, `Detected change in ${event.data[0].replace(`${root}/`, '')}`)
    }
  })

  proc.stdout.on('data', function (data) {
    console.log(data.toString())
  })

  proc.stderr.on('data', function (err) {
    error(entity, `${err}`)
  })

}

const clientWatch = () => {

  const devserver = new devServer(Webpack(config), {
    contentBase: path.join('public'),
    compress: true,
    hot: true,
    proxy: {
      '*': 'http://localhost:3001'
    },
    stats: 'errors-only',
    watchContentBase: true,
    open: true
  })

  devserver.use('/admin', express.static(path.join(root, 'packages', 'maha','src','admin','public'), { redirect: false }))

  devserver.listen(3000, () => {
    console.info('listening on 3000')
  })

}

export const dev = () => {

  serverWatch('server', path.join('admin','api'))

  serverWatch('socket', path.join('admin','api'))

  serverWatch('cron', path.join('cron'))

  serverWatch('worker', path.join('queues'))

  clientWatch()

}
