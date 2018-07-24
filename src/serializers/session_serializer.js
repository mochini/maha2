import { createUserToken } from '../core/utils/user_tokens'
import getUserAccess from '../core/utils/get_user_access'
import Notification from '../models/notification'
import loadNavigation from '../core/utils/load_navigation'
import knex from '../core/services/knex'
import moment from 'moment'

const navigation = loadNavigation()

const _expandNavigation = (items, req) => {

  return Promise.reduce(items, async (items, item) => {

    const canAccess = item.access ? await item.access(req) : true

    if(!canAccess) return items

    const subitems = item.items ? await _expandNavigation(item.items) : []

    return [
      ...items,
      {
        label: item.label,
        ...subitems.length > 0 ? { items: subitems } : {},
        route: item.route,
        rights: item.rights
      }
    ]

  }, [])

}

const SessionSerializer = async (req, trx, user) => {

  await user.load(['photo','team.logo','team.strategies'], { transacting: trx })

  req.team = user.related('team')

  const access = await getUserAccess(req.user, trx)

  const apps = await Promise.reduce(Object.keys(access.apps), async (apps, key) => {

    const app = access.apps[key]

    if(!navigation[app.code]) return apps

    if(!navigation[app.code].items || navigation[app.code].items.length === 0) {

      return [
        ...apps,
        app
      ]

    }

    const items = await _expandNavigation(navigation[app.code].items, req)

    return [
      ...apps,
      {
        ...app,
        items
      }
    ]

  }, [])

  const orderApps = apps.sort((a, b) => {

    if(a.label > b.label) return 1

    if(a.label < b.label) return -1

    return 0

  })

  const notifications = await Notification.where({
    user_id: user.get('id'),
    is_seen: false
  }).fetchAll({ transacting: trx })

  const token = createUserToken(user, 'user_id')

  const team_id = req.team.get('id')

  const users = await knex('maha_users').transacting(trx).where({ team_id }).whereRaw('last_online_at >= ?', moment().subtract(5, 'minutes'))

  const online = users.map(user => user.id)

  return {
    apps: orderApps,
    online,
    team: {
      id: user.related('team').get('id'),
      color: user.related('team').get('color'),
      title: user.related('team').get('title'),
      subdomain: user.related('team').get('subdomain'),
      logo: user.related('team').related('logo').get('path'),
      strategies: user.related('team').related('strategies').toJSON().map(strategy => strategy.name),
      token
    },
    user: {
      id: user.get('id'),
      full_name: user.get('full_name'),
      initials: user.get('initials'),
      email: user.get('email'),
      photo: user.related('photo').get('path'),
      unseen: notifications.length,
      rights: access.rights
    }
  }

}

export default SessionSerializer
