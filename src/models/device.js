import DeviceValue from './device_value'
import Model from '../objects/model'
import User from './user'

const Device = new Model({

  tableName: 'maha_devices',

  displayName: 'devices',

  displayAttribute: '',

  belongsToTeam: false,

  virtuals: {

    is_push_enabled: function() {
      return this.get('push_auth') !== null
    }

  },

  device_type() {
    return this.belongsTo(DeviceValue, 'device_type_id')
  },

  browser_name() {
    return this.belongsTo(DeviceValue, 'browser_name_id')
  },

  browser_version() {
    return this.belongsTo(DeviceValue, 'browser_version_id')
  },

  os_name() {
    return this.belongsTo(DeviceValue, 'os_name_id')
  },

  os_version() {
    return this.belongsTo(DeviceValue, 'os_version_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Device
