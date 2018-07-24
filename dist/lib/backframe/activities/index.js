'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _activity = require('../../../models/activity');

var _activity2 = _interopRequireDefault(_activity);

var _story = require('../../../models/story');

var _story2 = _interopRequireDefault(_story);

var _emitter = require('../../emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _backframe = require('backframe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var afterProcessor = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, trx, result, options) {
    var activityCreator, activity, story_id, object, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activityCreator = _getActivity(options);

            if (activityCreator) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', false);

          case 3:
            _context.next = 5;
            return activityCreator(req, trx, result, options);

          case 5:
            activity = _context.sent;
            _context.next = 8;
            return _findOrCreateStoryId(activity.story);

          case 8:
            story_id = _context.sent;
            _context.next = 11;
            return _getObject(activity, 'object');

          case 11:
            object = _context.sent;
            data = {
              team_id: req.user.get('team_id'),
              user_id: req.user.get('id'),
              app_id: req.app ? req.app.get('id') : null,
              story_id: story_id,
              object_owner_id: object.owner_id,
              object_table: object.table,
              object_text: object.text,
              object_id: object.id,
              url: activity.url
            };
            _context.next = 15;
            return _activity2.default.forge(data).save(null, { transacting: trx });

          case 15:
            _context.next = 17;
            return _emitter2.default.in('/team/activities').emit('message', {
              target: '/team/activities',
              action: 'refresh',
              data: null
            });

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function afterProcessor(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _getActivity = function _getActivity(options) {

  if (options.activity) return options.activity;

  return options.activities ? options.activities[options.action] : false;
};

var _getObject = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(activity, key) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!activity[key] && !activity[key + '_text'])) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', { owner_id: null, table: null, text: null, id: null });

          case 2:
            return _context2.abrupt('return', {
              owner_id: activity[key + '_owner_id'],
              table: activity[key] ? activity[key].tableName : null,
              text: activity[key + '_text'] || activity[key].get(activity[key].displayAttribute),
              id: activity[key] ? activity[key].get('id') : null
            });

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function _getObject(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _findOrCreateStoryId = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(text, trx) {
    var findStory, story;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (text) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', null);

          case 2:
            _context3.next = 4;
            return _story2.default.where({ text: text }).fetch({ transacting: trx });

          case 4:
            findStory = _context3.sent;
            _context3.t0 = findStory;

            if (_context3.t0) {
              _context3.next = 10;
              break;
            }

            _context3.next = 9;
            return _story2.default.forge({ text: text }).save(null, { transacting: trx });

          case 9:
            _context3.t0 = _context3.sent;

          case 10:
            story = _context3.t0;
            return _context3.abrupt('return', story.id);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function _findOrCreateStoryId(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = (0, _backframe.plugin)({
  name: 'activities',
  options: {
    activity: {
      type: 'object',
      required: false
    },
    activities: {
      type: 'object',
      required: false
    }
  },
  afterProcessor: afterProcessor
});

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(afterProcessor, 'afterProcessor', 'unknown');
  reactHotLoader.register(_getActivity, '_getActivity', 'unknown');
  reactHotLoader.register(_getObject, '_getObject', 'unknown');
  reactHotLoader.register(_findOrCreateStoryId, '_findOrCreateStoryId', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;