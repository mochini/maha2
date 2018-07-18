import Model from '../objects/model'
import User from './user'

const Supervisor = new Model({

  tableName: 'maha_supervisors',

  displayName: 'supervisor',

  displayAttribute: 'full_name',

  rules: {
    user_id: 'required'
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Supervisor
