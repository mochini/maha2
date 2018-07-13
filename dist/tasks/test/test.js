'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;

var _collect_objects = require('../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = exports.test = function test() {

  var mocha = new _mocha2.default();

  (0, _collect_objects2.default)('tests/**/*_test').map(function (test) {

    mocha.addFile(_path2.default.join(test));
  });

  mocha.run(function (failures) {

    process.exitCode = failures ? -1 : 0;
  });
};