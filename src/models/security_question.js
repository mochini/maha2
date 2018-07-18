import Model from '../objects/model'

const SecurityQuestion = new Model({

  tableName: 'maha_security_questions',

  displayName: 'security question',

  displayAttribute: 'text',

  rules: {
    text: ['required']
  }

})

export default SecurityQuestion
