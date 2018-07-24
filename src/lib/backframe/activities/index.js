import Activity from '../../../models/activity'
import Story from '../../../models/story'
import socket from '../../emitter'
import { plugin } from 'backframe'

const afterProcessor = async (req, trx, result, options) => {

  const activityCreator = _getActivity(options)

  if(!activityCreator) return false

  const activity = await activityCreator(req, trx, result, options)

  const story_id = await _findOrCreateStoryId(activity.story)

  const object = await _getObject(activity, 'object')

  const data = {
    team_id: req.user.get('team_id'),
    user_id: req.user.get('id'),
    app_id: req.app ? req.app.get('id') : null,
    story_id,
    object_owner_id: object.owner_id,
    object_table: object.table,
    object_text: object.text,
    object_id: object.id,
    url: activity.url
  }

  await Activity.forge(data).save(null, { transacting: trx })

  await socket.in('/team/activities').emit('message', {
    target: '/team/activities', 
    action: 'refresh',
    data: null
  })

}

const _getActivity = (options) => {

  if(options.activity) return options.activity

  return options.activities ? options.activities[options.action] : false

}

const _getObject = async (activity, key) => {

  if(!activity[key] && !activity[`${key}_text`]) return { owner_id: null, table: null, text: null, id: null }

  return {
    owner_id: activity[`${key}_owner_id`],
    table: activity[key] ? activity[key].tableName : null,
    text: activity[`${key}_text`] || activity[key].get(activity[key].displayAttribute),
    id: activity[key] ? activity[key].get('id') : null
  }

}

const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}

export default plugin({
  name: 'activities',
  options: {
    activity: {
      type: 'object',
      required: false
    },
    activities: {
      type: 'object',
      required: false
    }
  },
  afterProcessor
})
