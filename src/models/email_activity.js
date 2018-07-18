import Model from '../objects/model'
import EmailLink from './email_link'

const EmailActivity = new Model({

  tableName: 'maha_email_activities',

  displayName: 'email activity',

  link() {
    return this.belongsTo(EmailLink, 'email_link_id')
  }

})

export default EmailActivity
