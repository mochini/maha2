'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _notification_queue = require('../../../queues/notification_queue');

var _notification_queue2 = _interopRequireDefault(_notification_queue);

var _notification_type = require('../../../models/notification_type');

var _notification_type2 = _interopRequireDefault(_notification_type);

var _notification = require('../../../models/notification');

var _notification2 = _interopRequireDefault(_notification);

var _story = require('../../../models/story');

var _story2 = _interopRequireDefault(_story);

var _app = require('../../../models/app');

var _app2 = _interopRequireDefault(_app);

var _backframe = require('backframe');

var _emitter = require('../../emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _knex = require('../../knex');

var _knex2 = _interopRequireDefault(_knex);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var afterCommit = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, trx, result, options) {
    var notificationCreator;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (options.notification) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt('return', false);

          case 2:
            notificationCreator = options.notification[options.action] || options.notification;

            if (_lodash2.default.isFunction(notificationCreator)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', false);

          case 5:
            _context4.next = 7;
            return options.knex.transaction(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(trx) {
                var notifiations;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return notificationCreator(req, trx, result, options);

                      case 2:
                        notifiations = _context3.sent;
                        _context3.next = 5;
                        return (0, _bluebird.mapSeries)(_coerceArray(notifiations), function () {
                          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(notification) {
                            var data, story_id, notification_type_id;
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    data = (0, _extends3.default)({
                                      team_id: req.team.get('id'),
                                      app_id: req.app ? req.app.get('id') : null,
                                      type: notification.type,
                                      recipient_ids: _coerceArray(notification.recipient_ids),
                                      subject_id: notification.subject_id,
                                      owner_id: notification.owner_id,
                                      story: notification.story,
                                      url: notification.url
                                    }, _getObject(notification));
                                    _context2.next = 3;
                                    return _findOrCreateStoryId(data.story, trx);

                                  case 3:
                                    story_id = _context2.sent;
                                    _context2.next = 6;
                                    return _getNotificationType(data.type, trx);

                                  case 6:
                                    notification_type_id = _context2.sent;
                                    _context2.next = 9;
                                    return (0, _bluebird.mapSeries)(data.recipient_ids, function () {
                                      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user_id) {
                                        var exclusion, notificationData, notificationObject;
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                          while (1) {
                                            switch (_context.prev = _context.next) {
                                              case 0:
                                                if (!notification_type_id) {
                                                  _context.next = 6;
                                                  break;
                                                }

                                                _context.next = 3;
                                                return (0, _knex2.default)('maha_users_notification_types').transacting(trx).count('* as excluded').where({ user_id: user_id, notification_type_id: notification_type_id });

                                              case 3:
                                                exclusion = _context.sent;

                                                if (!(exclusion[0].excluded !== '0')) {
                                                  _context.next = 6;
                                                  break;
                                                }

                                                return _context.abrupt('return');

                                              case 6:
                                                notificationData = {
                                                  team_id: data.team_id,
                                                  user_id: user_id,
                                                  app_id: data.app_id,
                                                  subject_id: data.subject_id,
                                                  story_id: story_id,
                                                  object_owner_id: data.object_owner_id,
                                                  code: _lodash2.default.random(100000000, 999999999).toString(36),
                                                  object_table: data.object_table,
                                                  object_text: data.object_text,
                                                  object_id: data.object_id,
                                                  url: data.url,
                                                  is_delivered: false,
                                                  is_seen: false,
                                                  is_visited: false
                                                };
                                                _context.next = 9;
                                                return _notification2.default.forge(notificationData).save(null, { transacting: trx });

                                              case 9:
                                                notificationObject = _context.sent;
                                                _context.next = 12;
                                                return _emitter2.default.in('/users/' + user_id).emit('message', {
                                                  target: '/users/' + user_id,
                                                  action: 'notification',
                                                  data: null
                                                });

                                              case 12:

                                                _notification_queue2.default.enqueue(req, trx, notificationObject.get('id'));

                                              case 13:
                                              case 'end':
                                                return _context.stop();
                                            }
                                          }
                                        }, _callee, undefined);
                                      }));

                                      return function (_x7) {
                                        return _ref4.apply(this, arguments);
                                      };
                                    }());

                                  case 9:
                                  case 'end':
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, undefined);
                          }));

                          return function (_x6) {
                            return _ref3.apply(this, arguments);
                          };
                        }());

                      case 5:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function afterCommit(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _getObject = function _getObject(notification) {

  if (!notification.object) return { owner_id: null, table: null, text: null, id: null };

  return {
    object_owner_id: notification.object_owner_id || notification.owner_id,
    object_table: notification.object.tableName,
    object_text: notification.object_text || notification.object.text || notification.object.get(notification.object.displayAttribute),
    object_id: notification.object.id || notification.object.get('id')
  };
};

var _getNotificationType = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(namespaced, trx) {
    var parts, _parts, appCode, text, app, app_id, type;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (namespaced) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt('return', null);

          case 2:
            parts = namespaced.split(':');

            if (!(parts.length < 2)) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', null);

          case 5:
            _parts = (0, _slicedToArray3.default)(parts, 2), appCode = _parts[0], text = _parts[1];
            _context5.next = 8;
            return _app2.default.query(function (qb) {
              return qb.whereRaw('LOWER(REPLACE(maha_apps.title,\' \',\'\')) = ?', appCode);
            }).fetch({ transacting: trx });

          case 8:
            app = _context5.sent;
            app_id = app.get('id');
            _context5.next = 12;
            return _notification_type2.default.where({ app_id: app_id, text: text }).fetch({ transacting: trx });

          case 12:
            type = _context5.sent;
            return _context5.abrupt('return', type ? type.id : null);

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function _getNotificationType(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

var _findOrCreateStoryId = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(text, trx) {
    var findStory, story;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (text) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return', null);

          case 2:
            _context6.next = 4;
            return _story2.default.where({ text: text }).fetch({ transacting: trx });

          case 4:
            findStory = _context6.sent;
            _context6.t0 = findStory;

            if (_context6.t0) {
              _context6.next = 10;
              break;
            }

            _context6.next = 9;
            return _story2.default.forge({ text: text }).save(null, { transacting: trx });

          case 9:
            _context6.t0 = _context6.sent;

          case 10:
            story = _context6.t0;
            return _context6.abrupt('return', story.id);

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function _findOrCreateStoryId(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

var _coerceArray = function _coerceArray(value) {

  return !_lodash2.default.isArray(value) ? [value] : value;
};

exports.default = (0, _backframe.plugin)({
  name: 'notifier',
  options: {
    notification: {
      type: 'object',
      required: false
    }
  },
  afterCommit: afterCommit
});