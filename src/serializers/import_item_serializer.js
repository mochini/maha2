import serializer from '../objects/serializer'

const importItemSerializer = serializer((req, trx, result) => ({

  id: result.get('id')

}))

export default importItemSerializer
