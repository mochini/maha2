import Model from '../objects/model'
import App from './app'
import Right from './right'
import User from './user'

const Role = new Model({

  tableName: 'maha_roles',

  displayName: 'role',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique'],
    description: 'required'
  },

  apps() {
    return this.belongsToMany(App, 'maha_roles_apps', 'role_id', 'app_id')
  },

  rights() {
    return this.belongsToMany(Right, 'maha_roles_rights', 'role_id', 'right_id')
  },

  users() {
    return this.belongsToMany(User, 'maha_users_roles', 'role_id', 'user_id')
  }

})

export default Role
