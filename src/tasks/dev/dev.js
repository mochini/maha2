import { info, error } from '../../utils/console'
import serverWatch from '../../utils/watch'
import devServer from 'webpack-dev-server'
import config from './webpack.config'
import Webpack from 'webpack'
import express from 'express'
import rimraf from 'rimraf'
import path from 'path'
import fs from 'fs'

const root = path.resolve()

const removeBuilt = () => rimraf.sync(path.join('build'))

const clientWatch = () => {

  const devserver = new devServer(Webpack(config), {
    contentBase: path.join(root, 'node_modules', 'maha','src','admin','public'),
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

  devserver.listen(3000, () => {
    console.info('listening on 3000')
  })

}

export const dev = () => {

  serverWatch('server', path.join('admin','api'), ['start', 'server'])

  serverWatch('socket', path.join('admin','api'), ['start', 'socket'])

  serverWatch('cron', path.join('cron'), ['start', 'cron'])

  serverWatch('worker', path.join('queues'), ['start', 'worker'])

  clientWatch()

}
