'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var Installation = new _model2.default({

  tableName: 'maha_installations',

  displayName: 'app',

  displayAttribute: 'title',

  rules: {
    app_id: 'required'
  },

  virtuals: {
    title: function title() {
      return this.related('app').get('title');
    }
  },

  app: function app() {
    return this.belongsTo(_app2.default, 'app_id');
  }
});

var _default = Installation;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Installation, 'Installation', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;