import { action } from '../../utils/console'
import exec from '../../utils/exec'
import path from 'path'
import fs from 'fs'

export const git = async (flags, args) => {

  if(args.action === 'clone') await _clonePackage(args.repository)

}

const _getRepository = (name) => {

  if(name.match(/^https:\/\/github\.com\/.*\.git$/)) return name

  if(name.match(/^[\w\d-]*\/[\w\d-]*$/)) return `https://github.com/${name}.git`

  return `https://github.com/mahaplatform/${name}.git`

}

const _clonePackage = async (repo) => {

  const repository = _getRepository(repo)

  action('clone', repository)

  const parts = repository.match(/\/([\w\d-]*)\.git/)

  if(!parts) throw new Error(`Unable to clone ${repository}`)

  const name = parts[1]

  const destination = path.join('apps', name)

  if(fs.existsSync(destination)) throw new Error(`${repository} already cloned`)

  await exec(`git clone ${repository}`, path.resolve('apps'))

  return name

}
