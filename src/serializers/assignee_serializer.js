import serializer from '../objects/serializer'

const AssigneeSerializer = serializer((req, trx, result) => ({

  id: result.get('id'),

  type: result.get('type'),

  item_id: result.get('item_id'),

  name: result.get('name'),
  
  initials: result.get('initials'),

  photo: result.related('photo') ? result.related('photo').get('path') : null,

  created_at: result.get('created_at'),

  updated_at: result.get('updated_at')

}))

export default AssigneeSerializer
