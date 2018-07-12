'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _backframe = require('../lib/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resources = function Resources(options) {
  (0, _classCallCheck3.default)(this, Resources);


  return _backframe2.default.resources((0, _extends3.default)({}, options, {
    dependents: [{ relationship: 'activities', strategy: 'destroy' }, { relationship: 'audit', strategy: 'destroy' }, { relationship: 'comments', strategy: 'destroy' }, { relationship: 'listenings', strategy: 'destroy' }].concat((0, _toConsumableArray3.default)(options.dependents || []))
  }));
};

exports.default = Resources;