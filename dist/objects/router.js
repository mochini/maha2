'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backframe = require('../lib/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = function router(options) {

  return _backframe2.default.router(options);
};

exports.default = router;