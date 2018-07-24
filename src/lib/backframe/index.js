import backframe from 'backframe'
import knex from '../knex'
import redis from '../redis'
import authenticator from './authenticator'
import authorizer from './authorizer'
import app from './app'
import ownedByTeam from './owned_by_team'
import ownedByUser from './owned_by_user'
import activities from './activities'
import auditor from './auditor'
import listeners from './listeners'
import emitter from './emitter'
import notifier from './notifier'

export default backframe({
  knex,
  redis,
  plugins: [
    authenticator,
    authorizer,
    app,
    ownedByTeam,
    ownedByUser,
    listeners,
    activities,
    auditor,
    emitter,
    notifier
  ]
})
