'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../objects/model');

var _model2 = _interopRequireDefault(_model);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = Installation;