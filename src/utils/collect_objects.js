import glob from 'glob'

const collectObjects = (pattern) => [
  ...glob.sync(`node_modules/maha/src/${pattern}.js`),
  ...glob.sync(`apps/*/${pattern}.js`),
  ...glob.sync(`apps/*/${pattern}/index.js`)
]

export default collectObjects
