'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backframe = require('backframe');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var defaultQuery = function defaultQuery(req, trx, qb, options) {

  if (!options.ownedByTeam || !options.model) return;

  var tableName = options.model.extend().__super__.tableName;

  qb.whereRaw(tableName + '.team_id = ?', req.team.get('id'));
};

var defaultParams = function defaultParams(req, trx, options) {

  if (!options.ownedByTeam) return {};

  return {
    team_id: req.team.get('id')
  };
};

var _default = (0, _backframe.plugin)({
  name: 'ownedByTeam',
  options: {
    ownedByTeam: {
      type: 'boolean',
      required: false
    }
  },
  defaultParams: defaultParams,
  defaultQuery: defaultQuery
});

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultQuery, 'defaultQuery', 'unknown');
  reactHotLoader.register(defaultParams, 'defaultParams', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;