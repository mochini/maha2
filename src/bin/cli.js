#!/usr/bin/env babel-node
import collectObjects from '../utils/collect_objects'
import { error } from '../utils/console'
import register from 'babel-register'
import minimist from 'minimist'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

register({
  presets: [
    "es2015",
    "react",
    "stage-0"
  ],
  plugins: [
    "transform-promise-to-bluebird",
    ["transform-runtime", { "polyfill": false }]
  ]
})

const getTask = (command) => {

  const taskRoot = path.resolve(__dirname, '..', 'tasks')

  const taskFiles = fs.readdirSync(taskRoot)

  const tasks = taskFiles.reduce((tasks, taskFile) => {

    const namespaced = require(path.join(taskRoot, taskFile)).default

    return [
      ...tasks,
      ..._.castArray(namespaced)
    ]

  }, [])

  const named = _.find(tasks, { command })

  if(named) return named

  const aliased = _.find(tasks, { alias: command })

  if(aliased) return aliased

  return null

}

const run = async (args) => {

  const argv = minimist(args)

  const task = getTask(argv._[0])

  if(!task) throw new Error('invalid script')

  await task.action(...argv._.slice(1))

}

run(process.argv.slice(2))
