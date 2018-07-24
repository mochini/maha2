'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _backframe = require('backframe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultQuery = function defaultQuery(req, trx, qb, options) {

  if (!options.ownedByUser) return;

  var tableName = options.model.extend().__super__.tableName;

  var foreignKey = options.ownedByUserForeignKey || 'user_id';

  qb.whereRaw(tableName + '.' + foreignKey + ' = ?', req.user.get('id'));
};

var defaultParams = function defaultParams(req, trx, options) {

  if (!options.ownedByUser) return {};

  var foreignKey = options.ownedByUserForeignKey || 'user_id';

  return (0, _defineProperty3.default)({}, foreignKey, req.user.get('id'));
};

exports.default = (0, _backframe.plugin)({
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
  defaultParams: defaultParams,
  defaultQuery: defaultQuery
});