import { error, write } from '../utils/console'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

export const help = (command) => {

  write('\n')

  command ? helpCommand(command) : helpAll()

  write('\n')

  process.exit()

}

export const run = async (parsed) => {

  const task = getTask(parsed.command)

  if(!task) throw new Error('invalid script')

  const args = task.args.reduce((args, arg, index) => ({
    ...args,
    [arg.name]: parsed.args[index] || null
  }), {})

  try {

    await task.action(parsed.flags, args)

  } catch(err) {

    console.log(err)

  }

}

const getTasks = () => {

  const taskRoot = path.resolve(__dirname, '..', 'tasks')

  const taskFiles = fs.readdirSync(taskRoot)

  return taskFiles.reduce((tasks, taskFile) => {

    const namespaced = require(path.join(taskRoot, taskFile)).default

    return [
      ...tasks,
      ..._.castArray(namespaced)
    ]

  }, [])


}

const getTask = (command) => {

  const tasks = getTasks()

  const named = _.find(tasks, { command })

  if(named) return named

  const aliased = _.find(tasks, { alias: command })

  if(aliased) return aliased

  return null

}


const helpAll = async () => {

  const tasks = getTasks()

  write([
    { color: 'green', length: 15, content: 'Usage: ' },
    { color: 'white', content: 'maha [COMMAND] [FLAGS] [ARGS]' }
  ])

  write([
    { color: 'green', length: 15, content: 'Description: ' },
    { color: 'white', content: 'Tool for running maha tasks' }
  ])

  write('\nCOMMANDS:\n\n')

  tasks.map(task => write([
    { color: 'green', length: 25, content: `maha ${task.command}` },
    { color: 'white', content: `# ${task.description}` }
  ]))

}

const helpCommand = async (command) => {

  const task = getTask(command)

  let grammar = task.command

  if(task.flags.length) grammar += task.flags.map(flag => ` [--${flag.name}]`).join('')

  if(task.args.length) grammar += task.args.map(arg => ` <${arg.name}>`).join('')

  write([
    { color: 'green', length: 15, content: 'Usage:' },
    { color: 'white', content: `maha ${grammar}` }
  ])

  if(task.alias) {

    write([
      { color: 'green', length: 15, content: 'Alias:' },
      { color: 'white', content: `maha ${task.alias}` }
    ])

  }

  write([
    { color: 'green', length: 15, content: 'Description:' },
    { color: 'white', content: task.description }
  ])

  if(task.flags.length) {

    write('\nFLAGS:\n\n')

    task.flags.map(flag => write([
      { color: 'green', length: 15, content: `--${flag.name}` },
      { color: 'white', content: flag.description }
    ]))

  }

  if(task.args) {

    write('\nARGS:\n\n')

    task.args.map(arg => write([
      { color: 'green', length: 15, content: `<${arg.name}>` },
      { color: 'white', content: arg.description }
    ]))

  }

}
