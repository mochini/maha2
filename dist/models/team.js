'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

var _domain = require('./domain');

var _domain2 = _interopRequireDefault(_domain);

var _strategy = require('./strategy');

var _strategy2 = _interopRequireDefault(_strategy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Team = new _model2.default({

  tableName: 'maha_teams',

  displayName: 'team',

  displayAttribute: 'title',

  belongsToTeam: false,

  withRelated: ['logo', 'strategies'],

  rules: {
    title: ['required', 'unique'],
    subdomain: ['required', 'unique']
  },

  domains: function domains() {
    return this.hasMany(_domain2.default, 'team_id');
  },
  logo: function logo() {
    return this.belongsTo(_asset2.default, 'logo_id');
  },
  strategies: function strategies() {
    return this.hasMany(_strategy2.default, 'team_id');
  }
});

exports.default = Team;