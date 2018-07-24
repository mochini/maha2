import NotificationQueue from '../../../queues/notification_queue'
import NotificationType from '../../../models/notification_type'
import Notification from '../../../models/notification'
import Story from '../../../models/story'
import App from '../../../models/app'
import { plugin } from 'backframe'
import socket from '../../emitter'
import knex from '../../knex'
import _ from 'lodash'

const afterCommit = async(req, trx, result, options) => {

  if(!options.notification) return false

  const notificationCreator = options.notification[options.action] || options.notification

  if(!_.isFunction(notificationCreator)) return false

  await options.knex.transaction(async trx => {

    const notifiations = await notificationCreator(req, trx, result, options)

    await Promise.mapSeries(_coerceArray(notifiations), async notification => {

      const data = {
        team_id: req.team.get('id'),
        app_id: req.app ? req.app.get('id') : null,
        type: notification.type,
        recipient_ids: _coerceArray(notification.recipient_ids),
        subject_id: notification.subject_id,
        owner_id: notification.owner_id,
        story: notification.story,
        url: notification.url,
        ..._getObject(notification)
      }

      const story_id = await _findOrCreateStoryId(data.story, trx)

      const notification_type_id = await _getNotificationType(data.type, trx)

      await Promise.mapSeries(data.recipient_ids, async user_id => {

        if(notification_type_id) {

          const exclusion = await knex('maha_users_notification_types').transacting(trx).count('* as excluded').where({ user_id, notification_type_id })

          if(exclusion[0].excluded !== '0') return

        }

        const notificationData = {
          team_id: data.team_id,
          user_id,
          app_id: data.app_id,
          subject_id: data.subject_id,
          story_id,
          object_owner_id: data.object_owner_id,
          code: _.random(100000000, 999999999).toString(36),
          object_table: data.object_table,
          object_text: data.object_text,
          object_id: data.object_id,
          url: data.url,
          is_delivered: false,
          is_seen: false,
          is_visited: false
        }

        const notificationObject = await Notification.forge(notificationData).save(null, { transacting: trx })

        await socket.in(`/users/${user_id}`).emit('message', {
          target: `/users/${user_id}`,
          action: 'notification',
          data: null
        })

        NotificationQueue.enqueue(req, trx, notificationObject.get('id'))

      })


    })

  })

}

const _getObject = (notification) => {

  if(!notification.object) return { owner_id: null, table: null, text: null, id: null }

  return {
    object_owner_id: notification.object_owner_id || notification.owner_id,
    object_table: notification.object.tableName,
    object_text: notification.object_text || notification.object.text || notification.object.get(notification.object.displayAttribute),
    object_id: notification.object.id || notification.object.get('id')
  }

}

const _getNotificationType = async (namespaced, trx) => {

  if(!namespaced) return null

  const parts = namespaced.split(':')

  if(parts.length < 2) return null

  const [ appCode, text ] = parts

  const app = await App.query(qb => qb.whereRaw('LOWER(REPLACE(maha_apps.title,\' \',\'\')) = ?', appCode)).fetch({ transacting: trx })

  const app_id = app.get('id')

  const type = await NotificationType.where({ app_id, text }).fetch({ transacting: trx })

  return type ? type.id : null

}

const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}

const _coerceArray = (value) => {

  return !_.isArray(value) ? [value] : value

}

export default plugin({
  name: 'notifier',
  options: {
    notification: {
      type: 'object',
      required: false
    }
  },
  afterCommit
})
