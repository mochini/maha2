'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppCategory = new _model2.default({

  tableName: 'maha_app_categories',

  displayName: 'app category',

  displayAttribute: 'title',

  rules: {
    title: ['required', 'unique']
  },

  apps: function apps() {
    return this.hasMany(_app2.default, 'app_category_id');
  }
});

exports.default = AppCategory;