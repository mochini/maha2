'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatObjectForTransport = function formatObjectForTransport(value) {

  if (_lodash2.default.isDate(value)) return (0, _moment2.default)(value).utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';

  if (_lodash2.default.isPlainObject(value)) return Object.keys(value).reduce(function (formatted, key) {
    return (0, _extends4.default)({}, formatted, (0, _defineProperty3.default)({}, key, formatObjectForTransport(value[key])));
  }, {});

  return value;
};

exports.default = formatObjectForTransport;