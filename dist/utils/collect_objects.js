'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collectObjects = function collectObjects(pattern) {
  return [].concat((0, _toConsumableArray3.default)(_glob2.default.sync('node_modules/maha/src/' + pattern + '.js')), (0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/' + pattern + '.js')), (0, _toConsumableArray3.default)(_glob2.default.sync('apps/*/' + pattern + '/index.js')));
};

exports.default = collectObjects;