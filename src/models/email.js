import Model from '../objects/model'
import EmailActivity from './email_activity'
import User from './user'

const Email = new Model({

  tableName: 'maha_emails',

  displayName: 'email',

  displayAttribute: 'subject',

  activities() {
    return this.hasMany(EmailActivity, 'email_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Email
