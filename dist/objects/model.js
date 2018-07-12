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

require('../validations/greater_than_field_validation');

require('../validations/later_than_validation');

require('../validations/datestring_validation');

require('../validations/currency_validation');

require('../validations/unique_validation');

require('../validations/time_validation');

var _bookshelf = require('../lib/bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = function Model(options) {
  (0, _classCallCheck3.default)(this, Model);


  return _bookshelf2.default.Model.extend((0, _extends3.default)({

    hasTimestamps: options.hasTimestamps !== false,

    tableName: '',

    displayName: '',

    displayAttribute: '',

    rules: {},

    virtuals: {},

    initialize: function initialize(attrs, opts) {

      this.on('saving', this.validateSave);
    },

    fetch: function fetch() {
      var fetchOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      return _bookshelf2.default.Model.prototype.fetch.call(this, mergeOptions(fetchOptions, options));
    },

    fetchAll: function fetchAll() {
      var fetchOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      return _bookshelf2.default.Model.prototype.fetchAll.call(this, mergeOptions(fetchOptions, options));
    },

    validateSave: function validateSave(model, attrs, saveOptions) {

      if (saveOptions.skipValidation) return true;

      var rules = this.belongsToTeam !== false ? (0, _extends3.default)({}, saveOptions.withRules || this.rules, options.belongsToTeam !== false ? { team_id: 'required' } : {}) : {};

      return new _checkit2.default(rules).run(this.attributes, { tableName: this.tableName });
    },

    activities: function activities() {

      var Activity = require('../../../models/activity').default;

      return this.morphMany(Activity, 'activable', ['object_table', 'object_id']);
    },

    audit: function audit() {

      var Audit = require('../../../models/audit').default;

      return this.morphMany(Audit, 'auditable');
    },

    comments: function comments() {

      var Comment = require('../../../models/comment').default;

      return this.morphMany(Comment, 'commentable');
    },

    listenings: function listenings() {

      var Listening = require('../../../models/listening').default;

      return this.morphMany(Listening, 'listenable');
    },

    reviews: function reviews() {

      var Review = require('../../../models/review').default;

      return this.morphMany(Review, 'reviewable');
    },

    team: function team() {

      var Team = require('../../../models/team').default;

      return this.belongsTo(Team, 'team_id');
    }

  }, options));
};

var mergeOptions = function mergeOptions(options, config) {
  return (0, _extends3.default)({}, options, {
    withRelated: [].concat((0, _toConsumableArray3.default)(coerceArray(options.withRelated)), (0, _toConsumableArray3.default)(coerceArray(config.withRelated)))
  });
};

var coerceArray = function coerceArray(value) {
  return !_lodash2.default.isNil(value) ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

exports.default = Model;