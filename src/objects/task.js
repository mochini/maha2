// import { writePaddedLine } from '../../utils/console'
// import Rollbar from '../../services/rollbar'
// import chalk from 'chalk'
// import path from 'path'

const task = (args) => {

  const options = normalize(args)

  const source = require(options.file)

  const action = async (...args) => {

    await source[options.function](...args)

    if(options.exit) await process.exit()

  }

  return {
    command: options.command,
    alias: options.alias,
    description: options.description,
    action
  }

}

const normalize = (options) => ({
  exit: true,
  ...options
})

// const normalize = ({ command, description, alias, processor, env = true, exit = true, newline = true }) => {
//
//   return {
//
//     command,
//
//     description,
//
//     alias,
//
//     action: async (arg1, arg2, arg3) => {
//
//       try {
//
//         if(env) require(path.join(__dirname, '..', '..', 'services', 'environment.js'))
//
//         writePaddedLine(null, '', '#FFFFFF')
//
//         await processor(arg1, arg2, arg3)
//
//         if(newline) writePaddedLine(null, '', '#FFFFFF')
//
//         if(newline) process.stdout.write('\n')
//
//         if(exit) process.exit()
//
//       } catch(err) {
//
//         Rollbar.log(err.message)
//
//         console.log(chalk.red(err.message))
//
//         process.exit()
//
//       }
//
//     }
//
//   }
//
// }

export default task
