'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backframe = require('backframe');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultQuery = function defaultQuery(req, trx, qb, options) {

  if (!options.ownedByUser) return;

  var tableName = options.model.extend().__super__.tableName;

  var foreignKey = options.ownedByUserForeignKey || 'user_id';

  qb.whereRaw(tableName + '.' + foreignKey + ' = ?', req.user.get('id'));
};

var defaultParams = function defaultParams(req, trx, options) {

  if (!options.ownedByUser) return {};

  var foreignKey = options.ownedByUserForeignKey || 'user_id';

  return _defineProperty({}, foreignKey, req.user.get('id'));
};

var _default = (0, _backframe.plugin)({
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