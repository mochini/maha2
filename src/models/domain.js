import Model from '../objects/model'

const Domain = new Model({

  tableName: 'maha_domains',

  displayName: 'domain',

  displayAttribute: 'title',

  rules: {
    title: 'required'
  }

})

export default Domain
