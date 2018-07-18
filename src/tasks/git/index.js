import task from '../../objects/task'
import path from 'path'

const git = task({
  command: 'git',
  description: 'manage apps via git',
  args: [
    { name: 'action', description: 'git action' },
    { name: 'repository', description: 'git repository' }
  ],
  file: path.join(__dirname, 'git.js'),
  function: 'git'
})

export default git
