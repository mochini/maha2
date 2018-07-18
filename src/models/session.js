import Model from '../objects/model'
import Device from './device'
import User from './user'

const Session = new Model({

  tableName: 'maha_sessions',

  displayName: 'sessions',

  displayAttribute: '',

  device() {
    return this.belongsTo(Device, 'device_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Session
