import Listening from '../../../models/listening'
import { plugin } from 'backframe'
import _ from 'lodash'

// options.listeners is a function that returns a list of user_ids who are listening to activity
// on this item. If the listener doesnt already exists, we add them to the list

const afterProcessor = async(req, trx, result, options) => {

  if(!options.listeners) return

  const listenerCreator = _getListener(options)

  if(!listenerCreator) return

  const listener_ids = await listenerCreator(req, trx, result, options)
  
  if(listener_ids.length === 0) return

  const team_id = req.team.get('id')
  
  const listenable_type = options.model.extend().__super__.tableName

  const listenable_id = result.get('id')
  
  const active_listeners = await Listening.where({ team_id, listenable_type, listenable_id}).fetchAll({ transacting: trx })

  const active_listener_ids = active_listeners.map(listener => listener.get('user_id'))
  
  await Promise.mapSeries(listener_ids, async user_id => {
    
    if(_.includes(active_listener_ids, user_id)) return
    
    const data = {
      team_id,
      listenable_type,
      listenable_id,
      user_id
    }

    await Listening.forge(data).save(null, { transacting: trx })

  })

}

const _getListener = (options) => {

  if(_.isFunction(options.listeners)) return options.listeners

  return _.isPlainObject(options.listeners) ? options.listeners[options.action] : false

}

export default plugin({
  name: 'listeners',
  options: {
    listeners: {
      type: 'object',
      required: false
    }
  },
  afterProcessor
})
