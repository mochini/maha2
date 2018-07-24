import { plugin } from 'backframe'
import App from '../../../models/app'

const alterRequest = async (req, trx, options) => {

  if(!options.app_id) return req

  req.app = await App.where({ id: options.app_id }).fetch({ transacting: trx })

  return req

}

export default plugin({
  name: 'audit',
  options: {
    app_id: {
      type: 'integer',
      required: false
    }
  },
  alterRequest
})
