'use strict';

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.greaterThanField = function (val, param) {

  if (val <= this._target[param]) throw new Error('must be greater than the ' + param);

  return true;
};