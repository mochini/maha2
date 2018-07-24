import { plugin } from 'backframe'

const defaultQuery = (req, trx, qb, options) => {

  if(!options.ownedByTeam || !options.model) return

  const tableName = options.model.extend().__super__.tableName

  qb.whereRaw(`${tableName}.team_id = ?`, req.team.get('id'))

}

const defaultParams = (req, trx, options) => {

  if(!options.ownedByTeam) return {}

  return {
    team_id: req.team.get('id')
  }

}

export default plugin({
  name: 'ownedByTeam',
  options: {
    ownedByTeam: {
      type: 'boolean',
      required: false
    }
  },
  defaultParams,
  defaultQuery
})
