'use strict';

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_checkit2.default.Validator.prototype.laterThan = function (val, param) {

  var today = (0, _moment2.default)().format('YYYY-MM-DD');

  var first = (0, _moment2.default)(today + ' ' + this._target[param]);

  var last = (0, _moment2.default)(today + ' ' + val);

  console.log(first, last, last.diff(first) <= 0);

  if (last.diff(first) <= 0) throw new Error('must be after than the ' + param);

  return true;
};