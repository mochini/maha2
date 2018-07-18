import Model from '../objects/model'
import Asset from './asset'
import Service from './service'

const Attachment = new Model({

  tableName: 'maha_attachments',

  displayName: 'attachment',

  displayAttribute: '',

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  service() {
    return this.belongsTo(Service, 'service_id')
  }

})

export default Attachment
