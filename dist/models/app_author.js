'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppAuthor = new _model2.default({

  tableName: 'maha_app_authors',

  displayName: 'app author',

  displayAttribute: 'name',

  rules: {
    name: ['required', 'unique']
  },

  apps: function apps() {
    return this.hasMany(_app2.default, 'app_author_id');
  }
});

exports.default = AppAuthor;