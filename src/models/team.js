import Model from '../objects/model'
import Asset from './asset'
import Domain from './domain'
import Strategy from './strategy'

const Team = new Model({

  tableName: 'maha_teams',

  displayName: 'team',

  displayAttribute: 'title',

  belongsToTeam: false,

  withRelated: ['logo','strategies'],

  rules: {
    title: ['required', 'unique'],
    subdomain: ['required', 'unique']
  },

  domains() {
    return this.hasMany(Domain, 'team_id')
  },

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  },

  strategies() {
    return this.hasMany(Strategy, 'team_id')
  }

})

export default Team
