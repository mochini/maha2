import Model from '../objects/model'

const EmailTemplate = new Model({

  tableName: 'maha_email_templates',

  displayName: 'email template',

  displayAttribute: 'name'

})

export default EmailTemplate
