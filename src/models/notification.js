import Model from '../objects/model'
import App from './app'
import Story from './story'
import User from './user'

const Notification = new Model({

  tableName: 'maha_notifications',

  displayName: 'notification',

  rules: {
    user_id: ['required']
  },

  app() {
    return this.belongsTo(App, 'app_id')
  },

  object_owner() {
    return this.belongsTo(User, 'object_owner_id')
  },

  subject() {
    return this.belongsTo(User, 'subject_id')
  },

  object() {
    return this.morphTo('object', ['object_table', 'object_id'])
  },

  story() {
    return this.belongsTo(Story, 'story_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Notification
