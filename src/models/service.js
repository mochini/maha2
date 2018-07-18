import Model from '../objects/model'
import Attachment from './attachment'

const Service = new Model({

  tableName: 'maha_services',

  displayName: 'attachment',

  displayAttribute: '',
  
  belongsToTeam: false,
  
  hasTimestamps: false,

  attachments() {
    return this.hasMany(Attachment, 'service_id')
  }

})

export default Service
