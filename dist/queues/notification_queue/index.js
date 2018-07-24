'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _notification_serializer = require('../../serializers/notification_serializer');

var _notification_serializer2 = _interopRequireDefault(_notification_serializer);

var _webpush = require('../../lib/webpush');

var _notification = require('../../models/notification');

var _notification2 = _interopRequireDefault(_notification);

var _send_mail = require('../../utils/send_mail');

var _send_mail2 = _interopRequireDefault(_send_mail);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _queue = require('../../objects/queue');

var _queue2 = _interopRequireDefault(_queue);

var _knex = require('../../services/knex');

var _knex2 = _interopRequireDefault(_knex);

var _session = require('../../models/session');

var _session2 = _interopRequireDefault(_session);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootPath = _path2.default.resolve(__dirname, '..', '..', '..', 'src', 'emails');

var messageTemplate = _fs2.default.readFileSync(_path2.default.join(rootPath, 'notification_email', 'html.ejs')).toString();

var envelopeTemplate = _fs2.default.readFileSync(_path2.default.join(rootPath, 'envelope.ejs')).toString();

var host = process.env.WEB_HOST;

var enqueue = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, notification) {
    return _regenerator2.default.wrap(function _callee$(_context) {
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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(job, trx) {
    var id, withRelated, notification, serialized;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
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
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(user, notification, trx) {
    var user_id, activeQuery, activeSessions, query, subscribedSessions;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
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
            return (0, _bluebird.map)(subscribedSessions.toArray(), function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(session) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
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
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(notification, trx) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
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
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(notification, session, trx) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
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
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(notification, user, trx) {
    var notification_method_id, notifications, content, html, email;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
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
            notifications = [(0, _extends3.default)({}, notification, {
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
            return (0, _send_mail2.default)(email);

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

exports.default = notificationQueue;