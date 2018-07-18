import Model from '../objects/model'
import Asset from './asset'
import Profile from './profile'

const Source = new Model({

  tableName: 'maha_sources',

  displayName: 'source',

  displayAttribute: 'source',

  rules: {
  },

  assets() {
    return this.hasMany(Asset, 'asset_id')
  },

  profiles() {
    return this.hasMany(Profile, 'source_id')
  }

})

export default Source
