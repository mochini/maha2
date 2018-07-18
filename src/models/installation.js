import Model from '../objects/model'
import App from './app'

const Installation = new Model({

  tableName: 'maha_installations',

  displayName: 'app',

  displayAttribute: 'title',

  rules: {
    app_id: 'required'
  },

  virtuals: {

    title() {
      return this.related('app').get('title')
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  }

})

export default Installation
