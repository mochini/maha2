import { plugin } from 'backframe'
import Story from '../../../models/story'
import Audit from '../../../models/audit'
import _ from 'lodash'

const afterProcessor = async (req, trx, result, options) => {

  const entryCreator = _getEntry(options)

  if(!entryCreator) return false

  const entries = await entryCreator(req, trx, result, options)

  await Promise.map(_coerceArray(entries), async entry => {

    const auditable = await _getAuditable(entry)

    const story_id = await _findOrCreateStoryId(entry.story, trx)

    const data = {
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      auditable_type: auditable.type,
      auditable_id: auditable.id,
      story_id
    }

    await Audit.forge(data).save(null, { transacting: trx })

  })

}

const _getEntry = (options) => {

  // don't save audit entry when an item is being deleted
  if(options.action === 'destroy') return null

  if(_.isFunction(options.audit)) return options.audit

  return _.isPlainObject(options.audit) ? options.audit[options.action] : null

}

const _getAuditable = async (entry) => ({
  type: entry.auditable.tableName,
  id: entry.auditable.id || entry.auditable.get('id')
})

const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}

const _coerceArray = value => !_.isArray(value) ? [value] : value

export default plugin({
  name: 'auditor',
  options: {
    audit: {
      type: 'object',
      required: false
    }
  },
  afterProcessor
})
