import collectObjects from '../../utils/collect_objects'
import { info, error } from '../../utils/console'
import serverWatch from '../../utils/watch'
import { spawn } from 'child_process'
import Mocha from 'mocha'
import path from 'path'
import fs from 'fs'

export const run = () => serverWatch('test', '', 'test:run')

export const test = async () => {

  info('test', `Running tests`)

  const mocha = new Mocha()

  mocha.reporter('list')

  collectObjects('tests/**/*_test').map((test) => {

    mocha.addFile(test)

  })

  await new Promise((resolve, reject) => {

    const runner = mocha.run(resolve)

    runner.on('test', () => {})

    runner.on('test end', () => {})

    runner.on('end', () => {})

  })

}
