import Model from '../objects/model'
import User from './user'

const Group = new Model({

  tableName: 'maha_groups',

  displayName: 'group',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  users() {
    return this.belongsToMany(User, 'maha_users_groups', 'group_id', 'user_id')
  }

})

export default Group
