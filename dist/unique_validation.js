'use strict';

var _knex = require('../services/knex');

var _knex2 = _interopRequireDefault(_knex);

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.unique = function (val) {
  var _this = this;

  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  var tableName = params.tableName || options.tableName;

  var column = Object.keys(this._target).reduce(function (column, key) {
    return column || (_this._target[key] === val ? key : null);
  }, null);

  var query = (0, _knex2.default)(tableName).where(column, '=', val);

  if (_lodash2.default.isString(params)) {
    params.split(',').map(function (key) {
      query = query.where(key, _this._target[key]);
    });
  }

  if (this._target.team_id) {
    query = query.where({ team_id: this._target.team_id });
  }

  if (this._target.id) {
    query = query.whereNot({ id: this._target.id });
  }

  return query.then(function (resp) {
    if (resp.length > 0) throw new Error('The ' + column + ' is already in use');
  });
};
_checkit2.default.Validator.prototype.unique.message = 'Foo';