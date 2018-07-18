import Attachment from './attachment'
import Model from '../objects/model'
import User from './user'

const Review = new Model({

  tableName: 'maha_reviews',

  displayName: 'review',

  displayAttribute: '',

  rules: {
    score: ['required','greaterThanEqualTo:0','lessThanEqualTo:5'],
    text: 'required'
  },

  virtuals: {

  },

  attachments() {
    return this.morphMany(Attachment, 'attachable')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Review
