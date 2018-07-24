import Installation from '../models/installation'
import Right from '../models/right'
import App from '../models/app'
import knex from '../lib/knex'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

export default async (user, trx) => {

  const apps = await App.fetchAll({ transacting: trx })

  const installations = await Installation.query(qb => {

    qb.select(knex.raw('distinct on (maha_installations.app_id) maha_installations.*'))

    qb.innerJoin('maha_roles_apps', 'maha_roles_apps.app_id', 'maha_installations.app_id')

    qb.innerJoin('maha_users_roles', 'maha_users_roles.role_id', 'maha_roles_apps.role_id')

    qb.where('maha_installations.team_id', '=', user.get('team_id'))

    qb.where('maha_users_roles.user_id', '=', user.get('id'))

  }).fetchAll({ transacting: trx })

  const rights = await Right.query(qb => {

    qb.select(knex.raw('distinct on (maha_rights.id) maha_rights.*'))

    qb.innerJoin('maha_roles_rights', 'maha_roles_rights.right_id', 'maha_rights.id')

    qb.innerJoin('maha_users_roles', 'maha_users_roles.role_id', 'maha_roles_rights.role_id')

    qb.where('maha_users_roles.user_id', '=', user.get('id'))

  }).fetchAll({ transacting: trx })

  const appMap = apps.reduce((apps, app) => ({
    ...apps,
    [app.get('id')]: app
  }), {})

  const assginedApps = installations.reduce((apps, installation) => {

    const app = appMap[installation.get('app_id')]

    const code = _.toLower(_.camelCase(app.get('title')))

    const appFile = fs.readdirSync(path.resolve('apps')).reduce((found, app) => {

      return app || (app === code ? path.resolve('apps', app, 'app.js') : null)

    }, null)

    const config = require(appFile).default.config

    return {
      ...apps,
      [code]: {
        id: app.get('id'),
        code,
        label: config['title'],
        icon: config['icon'],
        color: config['color'],
        route: config['path'],
        settings: installation.get('settings')
      }
    }

  }, {})

  const assignedRights = rights.map(right => right.get('code'))

  return {
    apps: assginedApps,
    rights: assignedRights
  }

}
