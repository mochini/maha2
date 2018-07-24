'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatObjectForTransport = function formatObjectForTransport(value) {

  if (_lodash2.default.isDate(value)) return (0, _moment2.default)(value).utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';

  if (_lodash2.default.isPlainObject(value)) return Object.keys(value).reduce(function (formatted, key) {
    return _extends({}, formatted, _defineProperty({}, key, formatObjectForTransport(value[key])));
  }, {});

  return value;
};

var _default = formatObjectForTransport;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(formatObjectForTransport, 'formatObjectForTransport', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;