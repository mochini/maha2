import Model from '../objects/model'
import Author from './app_author'
import Category from './app_category'
import Role from './role'

const App = new Model({

  tableName: 'maha_apps',

  displayName: 'app',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  author() {
    return this.belongsTo(Author, 'app_author_id')
  },

  category() {
    return this.belongsTo(Category, 'app_category_id')
  },

  roles() {
    return this.belongsToMany(Role, 'maha_roles_apps', 'role_id', 'app_id')
  }

})

export default App
