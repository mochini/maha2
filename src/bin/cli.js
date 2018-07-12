#!/usr/bin/env babel-node
import minimist from 'minimist'
import path from 'path'
import fs from 'fs'
import register from 'babel-register'

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

const argv = minimist(process.argv.slice(2))

const namespace = argv._[0].split(':')[0]

const scriptPath = path.resolve(__dirname, '..', 'tasks', namespace, `${namespace}.js`)

if(!fs.existsSync(scriptPath)) throw new Error('invalid script')

const script = require(scriptPath).default

script(...argv._.slice(1))
