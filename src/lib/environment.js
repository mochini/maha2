import chalk from 'chalk'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const paths = [
  path.resolve('.env'),
  path.resolve('config', `${process.env.NODE_ENV}.env`),
  path.resolve('..', 'mahaplatform.com', '.env')
]

const envPath = paths.reduce((envPath, path) => {
  return envPath || (fs.existsSync(path) ? path : null)
}, null)

if(!envPath) {
  console.log(chalk.cyan('THE MAHA PLATFORM'))
  console.log('You have not yet configured your environment. Please run `maha env:setup` to set it up.')
  process.exit()
}

dotenv.load({ path: envPath })
