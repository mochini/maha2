'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.action = exports.log = exports.success = exports.error = exports.info = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var info = exports.info = function info(entity, message) {
  return log('i', 'blue', entity, message);
};

var error = exports.error = function error(entity, message) {
  return log('e', 'red', entity, message);
};

var success = exports.success = function success(entity, message) {
  return log('s', 'green', entity, message);
};

var log = exports.log = function log(prefix, color, entity, message) {
  return write([{ color: color, length: 2, content: prefix }, { color: 'grey', content: '[' + entity + ']' }, { color: 'white', content: ': ' + message }]);
};

var action = exports.action = function action(_action, target) {
  return write([{ color: 'green', length: 10, content: _action }, { color: 'white', content: target }]);
};

var write = exports.write = function write(items) {

  if (_lodash2.default.isString(items)) return process.stdout.write(items);

  _lodash2.default.castArray(items).map(function (item) {

    var content = item.length ? _lodash2.default.padEnd(item.content, item.length) : item.content;

    return process.stdout.write(_chalk2.default[item.color](content));
  });

  process.stdout.write('\n');
};