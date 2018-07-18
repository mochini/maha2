import Model from '../objects/model'
import User from './user'

const Supervision = new Model({

  tableName: 'maha_supervisions',

  displayName: 'supervision',

  supervisor() {
    return this.belongsTo(User, 'supervisor_id')
  },

  employee() {
    return this.belongsTo(User, 'employee_id')
  }

})

export default Supervision
