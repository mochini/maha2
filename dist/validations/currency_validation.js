'use strict';

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.currency = function (val) {
  var _this = this;

  var column = Object.keys(this._target).reduce(function (column, key) {
    return column || (_this._target[key] === val ? key : null);
  }, null);

  if (!val.match(/^\d{1,}\.\d{2}$/)) {
    throw new Error('The ' + column + ' must be valid currency');
  }

  return true;
};