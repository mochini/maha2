import Model from '../objects/model'
import App from './app'
import Role from './role'

const Right = new Model({

  tableName: 'maha_rights',

  displayName: 'right',

  displayAttribute: 'text',

  withRelated: 'app',

  rules: {
    text: 'required',
    app_id: 'required'
  },

  virtuals: {

    code: function() {
      return this.related('app').get('title').toLowerCase() + ':' + this.get('text').toLowerCase().replace(/\s/, '_')
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  },

  roles() {
    return this.belongsToMany(Role, 'maha_users_roles', 'user_id', 'role_id')
  }

})

export default Right
