'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backframe = require('backframe');

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

exports.default = (0, _backframe.plugin)({
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