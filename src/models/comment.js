import Attachment from './attachment'
import Model from '../objects/model'
import User from './user'

const Comment = new Model({

  tableName: 'maha_comments',

  displayName: 'comment',

  displayAttribute: '',

  rules: {
    text: 'required'
  },

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Comment
