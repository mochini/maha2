import chalk from 'chalk'
import _ from 'lodash'

const blue = chalk.hex('#0000FF')

const red = chalk.hex('#FF0000')

const green = chalk.hex('#00FF00')

const grey = chalk.hex('#888888')

const white = chalk.hex('#FFFFFF')

export const info = (entity, message) => log('i', blue, entity, message)

export const error = (entity, message) => log('e', red, entity, message)

export const success = (entity, message) => log('s', green, entity, message)

export const log = (prefix, color, entity, message) => write(color(_.padEnd(prefix, 2)) + grey(`[${entity}]`) + white(`: ${message}`) + '\n')

export const action = (action, target) => write(green(_.padEnd(action, 10)) + ' ' + white(target))

export const write = (string) => process.stdout.write(string)
