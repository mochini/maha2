import Model from '../objects/model'
import Activity from './activity'
import Notification from './notification'

const Story = new Model({

  tableName: 'maha_stories',

  displayName: 'story',

  displayAttribute: 'text',

  hasTimestamps: [],

  belongsToTeam: false,

  rules: {
    text: 'required'
  }

})

export default Story
