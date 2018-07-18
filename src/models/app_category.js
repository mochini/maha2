import Model from '../objects/model'
import App from './app'

const AppCategory = new Model({

  tableName: 'maha_app_categories',

  displayName: 'app category',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  apps() {
    return this.hasMany(App, 'app_category_id')
  }

})

export default AppCategory
