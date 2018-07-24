import { plugin, BackframeError } from 'backframe'
import Device from '../../../models/device'
import passport from '../../express/passport'
import Rollbar from '../../rollbar'
import moment from 'moment'

const alterRequest = async (req, trx, options) => {

  if(!options.authenticated) return req

  return await new Promise((resolve, reject) => {

    return passport('user_id', trx).authenticate('jwt', { session: false }, async (err, user, info) => {

      if(err) reject(new BackframeError({ code: 401, message: 'Unable to find user' }))

      if(!user) reject(new BackframeError({ code: 401, message: info.message }))

      const invalidated_at = user.get('invalidated_at')

      if(invalidated_at && (moment(invalidated_at).unix() - info.iat) > 0) reject(new BackframeError({ code: 401, message: 'This token has expired' }))

      const fingerprint = req.headers.fingerprint

      if(fingerprint) req.device = await Device.where({ fingerprint }).fetch({ transacting: trx })

      req.jwt = info

      req.team = user.related('team')

      req.user = user

      Rollbar.configure({
        payload: {
          person: {
            id: user.get('id'),
            username: user.get('full_name'),
            email: user.get('email')
          },
          request: {
            headers: req.headers,
            params: req.params,
            query: req.query,
            body: req.body
          }
        }
      })

      await _updateSession(req, trx, options)

      resolve(req)

    })(req)

  })

}

const _updateSession = async (req, trx, options) => {

  if(!req.device) return

  const data = {
    device_id: req.device.get('id'),
    user_id: req.user.get('id')
  }

  const last_active_at = moment()

  await options.knex('maha_sessions').transacting(trx).where(data).update({ last_active_at })

  const last_online_at = moment()

  await req.user.save({ last_online_at }, { patch: true, transacting: trx })

}

export default plugin({
  name: 'authenticator',
  options: {
    authenticated: {
      type: 'boolean',
      default: false
    }
  },
  alterRequest
})
