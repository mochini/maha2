'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Source = new _model2.default({

  tableName: 'maha_sources',

  displayName: 'source',

  displayAttribute: 'source',

  rules: {},

  assets: function assets() {
    return this.hasMany(_asset2.default, 'asset_id');
  },
  profiles: function profiles() {
    return this.hasMany(_profile2.default, 'source_id');
  }
});

var _default = Source;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Source, 'Source', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;