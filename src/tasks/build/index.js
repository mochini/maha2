import task from '../../objects/task'
import path from 'path'

const build = task({
  command: 'build',
  description: 'build platform for deployment',
  file: path.join(__dirname, 'build.js'),
  function: 'build'
})

export default build
