'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _collect_objects = require('./collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapped = null;

var models = function models(table) {

  if (mapped) return mapped[table];

  mapped = (0, _collect_objects2.default)('models/*').reduce(function (objects, model) {

    var object = require(model.filepath).default;

    var instance = object.extend().__super__;

    return (0, _extends4.default)({}, objects, (0, _defineProperty3.default)({}, instance.tableName, {
      model: object,
      displayName: instance.displayName,
      displayAttribute: instance.displayAttribute
    }));
  }, {});

  return mapped[table];
};

exports.default = models;