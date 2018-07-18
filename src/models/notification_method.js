import Model from '../objects/model'
import User from './user'

const NotificationMethod = new Model({

  tableName: 'maha_notification_methods',

  displayName: 'notification_method',

  displayAttribute: 'title',

  users() {
    return this.belongsToMany(User, 'notification_method_id')
  }

})

export default NotificationMethod
