import formatObjectForTransport from '../../../utils/format_object_for_transport'
import { plugin } from 'backframe'
import socket from '../../emitter'
import _ from 'lodash'

const afterCommit = async (req, trx, result, options) => {

  await handleRefresh(req, trx, result, options)

  await handleMessages(req, trx, result, options)

}

const handleRefresh = async (req, trx, result, options) => {

  const refreshCreator = _getForAction(options.refresh, options.action)

  if(!refreshCreator) return

  await options.knex.transaction(async trx => {

    const messages = await refreshCreator(req, trx, result, options)

    await Promise.map(_coerceArray(messages), async message => {

      try {

        const channel = _getChannel(req, message)

        const targets = _getTarget(req, message)

        await Promise.map(_coerceArray(targets), async target => {

          await socket.in(channel).emit('message', {
            target,
            action: 'refresh',
            data: null
          })

        })

      } catch(e) {

        process.stdout.write(e)

      }

    })

  })

}

const handleMessages = async (req, trx, result, options) => {

  const messageCreator = _getForAction(options.messages, options.action)

  if(!messageCreator) return

  await options.knex.transaction(async trx => {

    const messages = await messageCreator(req, trx, result, options)

    await Promise.map(_coerceArray(messages), async message => {

      try {

        const channel = _getChannel(req, message)

        const targets = _getTarget(req, message)

        await Promise.map(_coerceArray(targets), async target => {

          await socket.in(channel).emit('message', {
            target,
            action: message.action,
            data: formatObjectForTransport(message.data)
          })

        })

      } catch(e) {

        process.stdout.write(e)

      }

    })

  })

}

const _getChannel = (req, message) => {

  if(_.isString(message)) return message

  if(message.channel === 'admin') return `/teams/${req.team.get('id')}`

  if(message.channel === 'session') return '/session'

  if(message.channel === 'team') return `/teams/${req.team.get('id')}`

  if(message.channel === 'user') return `/users/${req.user.get('id')}`

  if(message.channel) return message.channel

  return null

}

const _getTarget = (req, message) => {

  if(message.target) return message.target

  return _getChannel(req, message)

}


const _getForAction = (object, action) => {

  if(!object) return null

  if(_.isFunction(object)) return object

  if(_.isFunction(object[action])) return object[action]

  return null

}

const _coerceArray = (value) => {

  return !_.isArray(value) ? [value] : value

}

export default plugin({
  afterCommit,
  name: 'refresher',
  options: {
    messages: {
      type: ['object', 'function'],
      required: false
    },
    refresh: {
      type: ['object', 'function'],
      required: false
    }
  }
})
