'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _notification_serializer = require('../serializers/notification_serializer');

var _notification_serializer2 = _interopRequireDefault(_notification_serializer);

var _notification = require('../models/notification');

var _notification2 = _interopRequireDefault(_notification);

var _webpush = require('../lib/webpush');

var _session = require('../models/session');

var _session2 = _interopRequireDefault(_session);

var _mail = require('../services/mail');

var _mail2 = _interopRequireDefault(_mail);

var _queue = require('../objects/queue');

var _queue2 = _interopRequireDefault(_queue);

var _emitter = require('../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _knex = require('../lib/knex');

var _knex2 = _interopRequireDefault(_knex);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var rootPath = _path2.default.resolve(__dirname, '..', 'emails');

var messageTemplate = _fs2.default.readFileSync(_path2.default.join(rootPath, 'notification_email', 'html.ejs')).toString();

var envelopeTemplate = _fs2.default.readFileSync(_path2.default.join(rootPath, 'envelope.ejs')).toString();

var host = process.env.WEB_HOST;

var enqueue = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, trx, notification) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', notification);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function enqueue(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var processor = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(job, trx) {
    var id, withRelated, notification, serialized;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = job.data;
            withRelated = ['app', 'object_owner', 'subject.photo', 'story', 'team', 'user'];
            _context2.next = 4;
            return _notification2.default.where({ id: id }).fetch({ withRelated: withRelated, transacting: trx });

          case 4:
            notification = _context2.sent;
            serialized = (0, _notification_serializer2.default)(null, trx, notification);
            _context2.next = 8;
            return _sendNotification(notification.related('user'), serialized, trx);

          case 8:
            return _context2.abrupt('return', id);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processor(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _sendNotification = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user, notification, trx) {
    var user_id, activeQuery, activeSessions, query, subscribedSessions;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user_id = user.get('id');

            activeQuery = function activeQuery(qb) {

              qb.where({ user_id: user_id });

              qb.whereRaw('last_active_at > ?', (0, _moment2.default)().subtract(30, 'seconds'));

              qb.orderBy('last_active_at', 'desc');
            };

            _context4.next = 4;
            return _session2.default.query(activeQuery).fetchAll({ withRelated: ['device'], transacting: trx });

          case 4:
            activeSessions = _context4.sent;

            if (!(activeSessions.length > 0)) {
              _context4.next = 9;
              break;
            }

            _context4.next = 8;
            return _sendViaApp(notification, trx);

          case 8:
            return _context4.abrupt('return', _context4.sent);

          case 9:
            query = function query(qb) {

              qb.select(_knex2.default.raw('distinct on (maha_devices.device_type_id, maha_devices.os_name_id) maha_sessions.*'));

              qb.innerJoin('maha_devices', 'maha_devices.id', 'maha_sessions.device_id');

              qb.whereRaw('maha_sessions.user_id = ?', user.get('id'));

              qb.whereRaw('maha_sessions.last_active_at < ?', (0, _moment2.default)().subtract(30, 'seconds'));

              qb.whereNotNull('maha_devices.push_auth');

              qb.orderByRaw('maha_devices.device_type_id asc, maha_devices.os_name_id asc, maha_sessions.last_active_at desc');
            };

            _context4.next = 12;
            return _session2.default.query(query).fetchAll({ withRelated: ['device'], transacting: trx });

          case 12:
            subscribedSessions = _context4.sent;

            if (!(subscribedSessions.length === 0)) {
              _context4.next = 17;
              break;
            }

            _context4.next = 16;
            return _sendViaEmail(notification, user, trx);

          case 16:
            return _context4.abrupt('return', _context4.sent);

          case 17:
            _context4.next = 19;
            return Promise.map(subscribedSessions.toArray(), function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(session) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _sendViaPush(notification, session, trx);

                      case 2:
                        return _context3.abrupt('return', _context3.sent);

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x9) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 19:
            return _context4.abrupt('return', _context4.sent);

          case 20:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _sendNotification(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var _sendViaApp = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(notification, trx) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _emitter2.default.in('/users/' + notification.user.id).emit('message', {
              target: '/notifications',
              action: 'add_notification',
              data: notification
            });

          case 2:
            _context5.next = 4;
            return _emitter2.default.in('/users/' + notification.user.id).emit('message', {
              target: '/users/' + notification.user.id,
              action: 'unread',
              data: null
            });

          case 4:
            _context5.next = 6;
            return (0, _knex2.default)('maha_notifications').transacting(trx).where({ id: notification.id }).update({ is_delivered: true, channel_id: 1 });

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function _sendViaApp(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var _sendViaPush = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(notification, session, trx) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _webpush.sendViaPush)(session, {
              title: 'New Notification',
              body: notification.description,
              url: process.env.WEB_HOST + '/nv' + notification.code
            });

          case 2:
            _context6.next = 4;
            return (0, _knex2.default)('maha_notifications').transacting(trx).where({ id: notification.id }).update({ is_delivered: true, channel_id: 2 });

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function _sendViaPush(_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

var _sendViaEmail = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(notification, user, trx) {
    var notification_method_id, notifications, content, html, email;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return user.load(['team', 'notification_method'], { transacting: trx });

          case 2:
            notification_method_id = user.related('notification_method').get('id');

            if (!(notification_method_id !== 1)) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt('return');

          case 5:
            notifications = [_extends({}, notification, {
              description: _getDescription(notification)
            })];
            content = _ejs2.default.render(messageTemplate, { moment: _moment2.default, pluralize: _pluralize2.default, host: host, notification_method_id: notification_method_id, user: user.toJSON(), notifications: notifications });
            html = _ejs2.default.render(envelopeTemplate, { moment: _moment2.default, host: host, content: content });
            email = {
              from: user.related('team').get('title') + ' <mailer@mahaplatform.com>',
              to: user.get('rfc822'),
              subject: 'Here\'s what you\'ve missed!',
              html: html,
              list: {
                unsubscribe: {
                  url: host + '#preferences',
                  comment: 'Unsubscribe'
                }
              }
            };
            _context7.next = 11;
            return (0, _mail2.default)(email);

          case 11:
            _context7.next = 13;
            return (0, _knex2.default)('maha_notifications').transacting(trx).where({ id: notification.id }).update({ is_delivered: true, channel_id: 3 });

          case 13:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function _sendViaEmail(_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

var _getDescription = function _getDescription(notification) {

  return notification.story.replace('{object}', _getDescriptionArticle(notification) + ' ' + notification.object.type + ' <strong>' + notification.object.text + '</strong>');
};

var _getDescriptionArticle = function _getDescriptionArticle(notification) {

  if (notification.object.owner_id === notification.subject.id) return 'their';

  if (notification.object.owner_id === notification.user.id) return 'your';

  return 'the';
};

var notificationQueue = new _queue2.default({
  name: 'notification',
  enqueue: enqueue,
  processor: processor
});

var _default = notificationQueue;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rootPath, 'rootPath', 'unknown');
  reactHotLoader.register(messageTemplate, 'messageTemplate', 'unknown');
  reactHotLoader.register(envelopeTemplate, 'envelopeTemplate', 'unknown');
  reactHotLoader.register(host, 'host', 'unknown');
  reactHotLoader.register(enqueue, 'enqueue', 'unknown');
  reactHotLoader.register(processor, 'processor', 'unknown');
  reactHotLoader.register(_sendNotification, '_sendNotification', 'unknown');
  reactHotLoader.register(_sendViaApp, '_sendViaApp', 'unknown');
  reactHotLoader.register(_sendViaPush, '_sendViaPush', 'unknown');
  reactHotLoader.register(_sendViaEmail, '_sendViaEmail', 'unknown');
  reactHotLoader.register(_getDescription, '_getDescription', 'unknown');
  reactHotLoader.register(_getDescriptionArticle, '_getDescriptionArticle', 'unknown');
  reactHotLoader.register(notificationQueue, 'notificationQueue', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;