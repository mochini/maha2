import Model from '../objects/model'
import AssetStatus from './asset_status'
import User from './user'
import Source from './source'

const Assets = new Model({

  tableName: 'maha_assets',

  displayName: 'asset',

  displayAttribute: 'file_name',

  virtuals: {

    extension: function() {
      return this.get('file_name').split('.').pop()
    },

    identifier: function() {
      return this.get('file_size')+'-'+this.get('original_file_name').replace(/[^0-9a-zA-Z_-]/img, '')
    },

    is_image: function() {
      return this.get('content_type').match(/image/) !== null
    },

    has_preview: function() {
      const is_pdf = this.get('content_type').match(/pdf/) !== null
      const is_doc = this.get('content_type').match(/msword/) !== null
      const is_xls = this.get('content_type').match(/excel/) !== null
      const is_openoffice = this.get('content_type').match(/officedocument/) !== null
      const is_email = this.get('content_type').match(/rfc822/) !== null
      const is_html = this.get('content_type').match(/html/) !== null
      return is_pdf || is_doc || is_xls || is_email || is_openoffice || is_html
    },

    path: function() {
      return (!this.isNew()) ? `/assets/${this.get('id')}/${this.get('file_name')}` : null
    },

    url: function() {
      return (!this.isNew()) ? `${process.env.DATA_ASSET_CDN_HOST}${this.get('path')}` : null
    }

  },

  source() {
    return this.belongsTo(Source, 'source_id')
  },

  status() {
    return this.belongsTo(AssetStatus, 'status_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Assets
