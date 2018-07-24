'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(options) {
    _classCallCheck(this, Model);

    return _bookshelf2.default.Model.extend(_extends({

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

        var rules = this.belongsToTeam !== false ? _extends({}, saveOptions.withRules || this.rules, options.belongsToTeam !== false ? { team_id: 'required' } : {}) : {};

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
  }

  _createClass(Model, [{
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Model;
}();

var mergeOptions = function mergeOptions(options, config) {
  return _extends({}, options, {
    withRelated: [].concat(_toConsumableArray(coerceArray(options.withRelated)), _toConsumableArray(coerceArray(config.withRelated)))
  });
};

var coerceArray = function coerceArray(value) {
  return !_lodash2.default.isNil(value) ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

var _default = Model;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Model, 'Model', 'unknown');
  reactHotLoader.register(mergeOptions, 'mergeOptions', 'unknown');
  reactHotLoader.register(coerceArray, 'coerceArray', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;