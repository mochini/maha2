import NotificationSerializer from '../serializers/notification_serializer'
import Notification from '../models/notification'
import { sendViaPush } from '../lib/webpush'
import Session from '../models/session'
import sendMail from '../services/mail'
import Queue from '../objects/queue'
import socket from '../lib/emitter'
import pluralize from 'pluralize'
import knex from '../lib/knex'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const rootPath = path.resolve(__dirname, '..', 'emails')

const messageTemplate = fs.readFileSync(path.join(rootPath, 'notification_email', 'html.ejs')).toString()

const envelopeTemplate = fs.readFileSync(path.join(rootPath, 'envelope.ejs')).toString()

const host = process.env.WEB_HOST

const enqueue = async (req, trx, notification) => notification

const processor = async (job, trx) => {

  const id = job.data

  const withRelated = ['app', 'object_owner', 'subject.photo', 'story', 'team', 'user']

  const notification = await Notification.where({ id }).fetch({ withRelated, transacting: trx  })

  const serialized = NotificationSerializer(null, trx, notification)

  await _sendNotification(notification.related('user'), serialized, trx)

  return id

}

const _sendNotification= async (user, notification, trx) => {

  const user_id = user.get('id')

  const activeQuery = qb => {

    qb.where({ user_id })

    qb.whereRaw('last_active_at > ?', moment().subtract(30, 'seconds'))

    qb.orderBy('last_active_at', 'desc')

  }

  const activeSessions = await Session.query(activeQuery).fetchAll({ withRelated: ['device'], transacting: trx })

  if(activeSessions.length > 0) return await _sendViaApp(notification, trx)

  const query = qb => {

    qb.select(knex.raw('distinct on (maha_devices.device_type_id, maha_devices.os_name_id) maha_sessions.*'))

    qb.innerJoin('maha_devices', 'maha_devices.id', 'maha_sessions.device_id')

    qb.whereRaw('maha_sessions.user_id = ?', user.get('id'))

    qb.whereRaw('maha_sessions.last_active_at < ?', moment().subtract(30, 'seconds'))

    qb.whereNotNull('maha_devices.push_auth')

    qb.orderByRaw('maha_devices.device_type_id asc, maha_devices.os_name_id asc, maha_sessions.last_active_at desc')

  }

  const subscribedSessions = await Session.query(query).fetchAll({ withRelated: ['device'], transacting: trx })

  if(subscribedSessions.length === 0) return await _sendViaEmail(notification, user, trx)

  return await Promise.map(subscribedSessions.toArray(), async session => {

    return await _sendViaPush(notification, session, trx)

  })

}

const _sendViaApp = async (notification, trx) => {

  await socket.in(`/users/${notification.user.id}`).emit('message', {
    target: '/notifications',
    action: 'add_notification',
    data: notification
  })

  await socket.in(`/users/${notification.user.id}`).emit('message', {
    target: `/users/${notification.user.id}`,
    action: 'unread',
    data: null
  })

  await knex('maha_notifications').transacting(trx).where({ id: notification.id }).update({ is_delivered: true, channel_id: 1 })

}

const _sendViaPush = async (notification, session, trx) => {

  await sendViaPush(session, {
    title: 'New Notification',
    body: notification.description,
    url: `${process.env.WEB_HOST}/nv${notification.code}`
  })

  await knex('maha_notifications').transacting(trx).where({ id: notification.id }).update({ is_delivered: true, channel_id: 2 })

}

const _sendViaEmail = async (notification, user, trx) => {

  await user.load(['team','notification_method'], { transacting: trx })

  const notification_method_id = user.related('notification_method').get('id')

  if(notification_method_id !== 1) return

  const notifications = [{
    ...notification,
    description: _getDescription(notification)
  }]

  const content = ejs.render(messageTemplate, { moment, pluralize, host, notification_method_id, user: user.toJSON(), notifications })

  const html = ejs.render(envelopeTemplate, { moment, host, content })

  const email = {
    from: `${user.related('team').get('title')} <mailer@mahaplatform.com>`,
    to: user.get('rfc822'),
    subject: 'Here\'s what you\'ve missed!',
    html,
    list: {
      unsubscribe: {
        url: host+'#preferences',
        comment: 'Unsubscribe'
      }
    }
  }

  await sendMail(email)

  await knex('maha_notifications').transacting(trx).where({ id: notification.id }).update({ is_delivered: true, channel_id: 3 })

}

const _getDescription = (notification) => {

  return notification.story.replace('{object}', `${_getDescriptionArticle(notification)} ${notification.object.type} <strong>${notification.object.text}</strong>`)

}

const _getDescriptionArticle = (notification) => {

  if(notification.object.owner_id === notification.subject.id) return 'their'

  if(notification.object.owner_id === notification.user.id) return 'your'

  return 'the'

}

const notificationQueue = new Queue({
  name: 'notification',
  enqueue,
  processor
})

export default notificationQueue
