#!/usr/bin/env babel-node
import '../lib/environment'
import register from 'babel-register'
import { usage, help, run } from './cli'
import minimist from 'minimist'
import _ from 'lodash'

register({
  presets: [
    'es2015',
    'react',
    'stage-0'
  ],
  plugins: [
    'transform-promise-to-bluebird',
    ['transform-runtime', { 'polyfill': false }]
  ]
})

const parse = (args) => {

  const argv = minimist(args)

  return {
    command: argv._[0],
    args: argv._.slice(1),
    help: argv.help !== undefined,
    flags: _.omit(argv, ['help', '_'])
  }

}

const execute = async (argv) => {

  const parsed = parse(argv)

  if(parsed.help || !parsed.command) return help(parsed.command)

  await run(parsed)

}

execute(process.argv.slice(2))
