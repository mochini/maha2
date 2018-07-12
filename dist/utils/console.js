'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = exports.success = exports.error = exports.info = exports.log = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blue = _chalk2.default.hex('#0000FF');

var red = _chalk2.default.hex('#FF0000');

var green = _chalk2.default.hex('#00FF00');

var grey = _chalk2.default.hex('#888888');

var white = _chalk2.default.hex('#FFFFFF');

var log = exports.log = function log(prefix, color, entity, message) {
  return console.log(color(_lodash2.default.padEnd(prefix, 2)) + grey('[' + entity + ']') + white(': ' + message));
};

var info = exports.info = function info(entity, message) {
  return log('i', blue, entity, message);
};

var error = exports.error = function error(entity, message) {
  return log('e', red, entity, message);
};

var success = exports.success = function success(entity, message) {
  return log('s', green, entity, message);
};

var action = exports.action = function action(_action, target) {
  return console.log(green(_lodash2.default.padEnd(_action, 10)) + ' ' + white(target));
};