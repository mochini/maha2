import MahaCompilerPlugin from '../../lib/webpack/maha_compiler_plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import webpack from 'webpack'
import path from 'path'

const config = (name, base, port) => ({
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    path.resolve('build', `${name}.js`),
    path.resolve('build', `${name}.less`)
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?url=false',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer, cssnano]
            }
          },
          'less-loader'
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  mode: 'development',
  output: {
    filename: 'application.js'
  },
  plugins: [
    new MahaCompilerPlugin(name),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(base, 'ui', 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DOMAIN': JSON.stringify(process.env.DOMAIN || 'localhost'),
        'SOCKET_PORT': JSON.stringify(process.env.SOCKET_PORT || '8090'),
        'VAPID_PUBLIC_KEY': JSON.stringify(process.env.VAPID_PUBLIC_KEY),
        'WEB_HOST': JSON.stringify(process.env.WEB_HOST),
        'WEB_ASSET_CDN_HOST': JSON.stringify(process.env.WEB_ASSET_CDN_HOST),
        'DATA_ASSET_CDN_HOST': JSON.stringify(process.env.DATA_ASSET_CDN_HOST),
        'WEB_ASSET_HOST': JSON.stringify(process.env.WEB_ASSET_HOST),
        'DATA_ASSET_HOST': JSON.stringify(process.env.DATA_ASSET_HOST),
        'ROLLBAR_CLIENT_TOKEN': JSON.stringify(process.env.ROLLBAR_CLIENT_TOKEN)
      }
    })
  ],
  resolve: {
    alias: {
      apps: path.resolve('apps'),
      packages: path.resolve('packages')
    }
  }
})

export default config
