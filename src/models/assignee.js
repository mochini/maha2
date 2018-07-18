import Model from '../objects/model'
import Asset from './asset'

const Assignee = new Model({

  tableName: 'maha_assignees',

  displayName: 'assignee',

  displayAttribute: 'name',

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  }

})

export default Assignee
