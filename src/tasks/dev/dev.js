import { info, error } from '../../utils/console'
import serverWatch from '../../utils/watch'
import devServer from 'webpack-dev-server'
import config from './webpack.config'
import Webpack from 'webpack'
import express from 'express'
import rimraf from 'rimraf'
import path from 'path'
import fs from 'fs'

const removeBuilt = () => rimraf.sync(path.join('build'))

const clientWatch = (base, port) => {

  const devserver = new devServer(Webpack(config(base, port)), {
    contentBase: path.join(base, 'public'),
    compress: true,
    hot: true,
    proxy: {
      '*': 'http://localhost:3001'
    },
    stats: 'errors-only',
    watchContentBase: true,
    open: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /.*/, to: "index.html" },
      ]
    }
  })

  devserver.listen(port, () => {
    console.info(`Listening on ${port}`)
  })

}

export const dev = () => {

  serverWatch('server', [
    path.join('admin','api'),
    path.join('models'),
    path.join('serializers')
  ], ['start', 'server'])

  serverWatch('socket', [
    path.join('admin','api'),
    path.join('models'),
    path.join('serializers')
  ], ['start', 'socket'])

  serverWatch('cron', [
    path.join('cron'),
    path.join('models'),
    path.join('serializers')
  ], ['start', 'cron'])

  serverWatch('worker', [
    path.join('queues'),
    path.join('mailboxes'),
    path.join('models'),
    path.join('serializers')
  ], ['start', 'worker'])

  clientWatch(path.resolve('node_modules', 'maha', 'src', 'admin'), 3000)

  fs.readdirSync(path.join('apps')).map((app, index) => {

    clientWatch(path.resolve('apps', app, 'public'), 4000 + index)

  })

}
