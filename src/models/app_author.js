import Model from '../objects/model'
import App from './app'

const AppAuthor = new Model({

  tableName: 'maha_app_authors',

  displayName: 'app author',

  displayAttribute: 'name',

  rules: {
    name: ['required', 'unique']
  },

  apps() {
    return this.hasMany(App, 'app_author_id')
  }

})

export default AppAuthor
