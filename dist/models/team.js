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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

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

var _default = Team;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Team, 'Team', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;