'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app_author = require('./app_author');

var _app_author2 = _interopRequireDefault(_app_author);

var _app_category = require('./app_category');

var _app_category2 = _interopRequireDefault(_app_category);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var App = new _model2.default({

  tableName: 'maha_apps',

  displayName: 'app',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  author: function author() {
    return this.belongsTo(_app_author2.default, 'app_author_id');
  },
  category: function category() {
    return this.belongsTo(_app_category2.default, 'app_category_id');
  },
  roles: function roles() {
    return this.belongsToMany(_role2.default, 'maha_roles_apps', 'role_id', 'app_id');
  }
});

var _default = App;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, 'App', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;