import Model from '../objects/model'
import Source from './source'
import User from './user'

const Profile = new Model({

  tableName: 'maha_profiles',

  displayName: 'profile',

  displayAttribute: 'type',

  rules: {
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  source() {
    return this.belongsTo(Source, 'source_id')
  }

})

export default Profile
