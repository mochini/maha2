import Model from '../objects/model'

const Strategy = new Model({

  tableName: 'maha_strategies',

  displayName: 'strategy',

  displayAttribute: 'name',

  rules: {
    name: 'required'
  }

})

export default Strategy
