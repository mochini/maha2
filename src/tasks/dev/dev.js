import { info } from '../../utils/console'
import serverWatch from '../../utils/watch'
import devServer from 'webpack-dev-server'
import config from './webpack.config'
import webpack from 'webpack'
import path from 'path'
import fs from 'fs'

const clientWatch = (name, base, port) => {

  const compiler = webpack(config(name, base, port))

  const devserver = new devServer(compiler, {
    contentBase: path.join(base, 'public'),
    compress: true,
    disableHostCheck: true,
    host: '0.0.0.0',
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
        { from: /.*/, to: 'index.html' }
      ]
    }
  })

  devserver.listen(port, '0.0.0.0', () => {
    info(name, `Listening on ${port}`)
  })

}

export const dev = () => {

  serverWatch('maha', 'start')

  clientWatch('admin', path.resolve('node_modules', 'maha', 'src', 'admin'), 3000)

  fs.readdirSync(path.join('apps')).map((app, index) => {

    clientWatch(app, path.resolve('apps', app, 'public'), 4000 + index)

  })

}
