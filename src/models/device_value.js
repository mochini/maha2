import Model from '../objects/model'

const DeviceValue = new Model({

  tableName: 'maha_device_values',

  displayName: 'device_values',

  displayAttribute: '',

  belongsToTeam: false,

  hasTimestamps: false

})

export default DeviceValue
