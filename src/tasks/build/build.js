import { action } from '../../utils/console'
import { transform } from 'babel-core'
import move from 'move-concurrently'
import webpack from 'webpack'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

const getItemType = (item) => item.match(/([^.]*)\.?(.*)?/)[2] || 'dir'

const getItem = (src, root, item) => ({
  src,
  type: getItemType(item)
})

const listContents = (src, root, item) => [
  getItem(src, root, item),
  ...fs.lstatSync(src).isDirectory() ? listItems(src) : []
]

const listItems = (root) => fs.readdirSync(root).reduce((items, item) => [
  ...items,
  ...listContents(path.join(root, item), root, item)
], [])

const transpile = (src, dest) => {

  action('compile', src)

  const contents = fs.readFileSync(src, 'utf8')

  const transpiled = transform(contents, {
    presets: [
      'babel-preset-es2015',
      'babel-preset-stage-0',
      'babel-preset-stage-0'
    ],
    plugins: [
      'react-hot-loader/babel'
    ]
  })

  fs.writeFileSync(dest, transpiled.code)

}

const mkdir = (src, dest) => {

  action('mkdir', src)

  mkdirp.sync(dest)

}

const copy = (src, dest) => {

  action('copy', src)

  return Promise.promisify(ncp)(src, dest)

}

const buildItem = async (item, srcPath, destPath) => {

  const dest = item.src.replace(srcPath, destPath)

  if(item.type === 'js') return transpile(item.src, dest)

  if(item.type === 'dir') return mkdir(item.src, dest)

  return await copy(item.src, dest)

}

const buildItems = async (srcPath, destPath) => {

  const items = listItems(srcPath)

  await Promise.mapSeries(items, item => buildItem(item, srcPath, destPath))

}

export const build = async () => {

  await buildItems(path.join('apps'), path.join('build','apps'))

}
