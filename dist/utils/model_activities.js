'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _collect_objects = require('./collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapped = null;

var models = function models(table) {

  if (mapped) return mapped[table];

  mapped = (0, _collect_objects2.default)('models/*').reduce(function (objects, model) {

    var object = require(model.filepath).default;

    var instance = object.extend().__super__;

    return _extends({}, objects, _defineProperty({}, instance.tableName, {
      model: object,
      displayName: instance.displayName,
      displayAttribute: instance.displayAttribute
    }));
  }, {});

  return mapped[table];
};

var _default = models;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapped, 'mapped', 'unknown');
  reactHotLoader.register(models, 'models', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;