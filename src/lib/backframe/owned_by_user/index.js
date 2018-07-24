import { plugin } from 'backframe'

const defaultQuery = (req, trx, qb, options) => {

  if(!options.ownedByUser) return

  const tableName = options.model.extend().__super__.tableName

  const foreignKey = options.ownedByUserForeignKey || 'user_id'

  qb.whereRaw(`${tableName}.${foreignKey} = ?`, req.user.get('id'))

}

const defaultParams = (req, trx, options) => {

  if(!options.ownedByUser) return {}

  const foreignKey = options.ownedByUserForeignKey || 'user_id'

  return {
    [foreignKey]: req.user.get('id')
  }

}

export default plugin({
  name: 'ownedByUser',
  options: {
    ownedByUser: {
      type: 'boolean',
      required: false
    },
    ownedByUserForeignKey: {
      type: 'string',
      required: false
    }
  },
  defaultParams,
  defaultQuery
})
