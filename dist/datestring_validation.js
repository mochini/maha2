'use strict';

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.datestring = function (val) {
  var _this = this;

  var column = Object.keys(this._target).reduce(function (column, key) {
    return column || (_this._target[key] === val ? key : null);
  }, null);

  if (_lodash2.default.isString(val) && !val.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error('The ' + column + ' must be in the format YYYY-MM-DD');
  }

  return true;
};