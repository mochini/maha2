'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _backframe = require('backframe');

var _story = require('../../../models/story');

var _story2 = _interopRequireDefault(_story);

var _audit = require('../../../models/audit');

var _audit2 = _interopRequireDefault(_audit);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var afterProcessor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, result, options) {
    var entryCreator, entries;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            entryCreator = _getEntry(options);

            if (entryCreator) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', false);

          case 3:
            _context2.next = 5;
            return entryCreator(req, trx, result, options);

          case 5:
            entries = _context2.sent;
            _context2.next = 8;
            return (0, _bluebird.map)(_coerceArray(entries), function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(entry) {
                var auditable, story_id, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _getAuditable(entry);

                      case 2:
                        auditable = _context.sent;
                        _context.next = 5;
                        return _findOrCreateStoryId(entry.story, trx);

                      case 5:
                        story_id = _context.sent;
                        data = {
                          team_id: req.user.get('team_id'),
                          user_id: req.user.get('id'),
                          auditable_type: auditable.type,
                          auditable_id: auditable.id,
                          story_id: story_id
                        };
                        _context.next = 9;
                        return _audit2.default.forge(data).save(null, { transacting: trx });

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function afterProcessor(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _getEntry = function _getEntry(options) {

  // don't save audit entry when an item is being deleted
  if (options.action === 'destroy') return null;

  if (_lodash2.default.isFunction(options.audit)) return options.audit;

  return _lodash2.default.isPlainObject(options.audit) ? options.audit[options.action] : null;
};

var _getAuditable = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(entry) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', {
              type: entry.auditable.tableName,
              id: entry.auditable.id || entry.auditable.get('id')
            });

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function _getAuditable(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _findOrCreateStoryId = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(text, trx) {
    var findStory, story;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (text) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt('return', null);

          case 2:
            _context4.next = 4;
            return _story2.default.where({ text: text }).fetch({ transacting: trx });

          case 4:
            findStory = _context4.sent;
            _context4.t0 = findStory;

            if (_context4.t0) {
              _context4.next = 10;
              break;
            }

            _context4.next = 9;
            return _story2.default.forge({ text: text }).save(null, { transacting: trx });

          case 9:
            _context4.t0 = _context4.sent;

          case 10:
            story = _context4.t0;
            return _context4.abrupt('return', story.id);

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _findOrCreateStoryId(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var _coerceArray = function _coerceArray(value) {
  return !_lodash2.default.isArray(value) ? [value] : value;
};

exports.default = (0, _backframe.plugin)({
  name: 'auditor',
  options: {
    audit: {
      type: 'object',
      required: false
    }
  },
  afterProcessor: afterProcessor
});