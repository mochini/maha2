'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _format_object_for_transport = require('../../../utils/format_object_for_transport');

var _format_object_for_transport2 = _interopRequireDefault(_format_object_for_transport);

var _backframe = require('backframe');

var _emitter = require('../../emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var afterCommit = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, result, options) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return handleRefresh(req, trx, result, options);

          case 2:
            _context.next = 4;
            return handleMessages(req, trx, result, options);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function afterCommit(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var handleRefresh = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, trx, result, options) {
    var refreshCreator;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            refreshCreator = _getForAction(options.refresh, options.action);

            if (refreshCreator) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt('return');

          case 3:
            _context5.next = 5;
            return options.knex.transaction(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(trx) {
                var messages;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return refreshCreator(req, trx, result, options);

                      case 2:
                        messages = _context4.sent;
                        _context4.next = 5;
                        return (0, _bluebird.map)(_coerceArray(messages), function () {
                          var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(message) {
                            var channel, targets;
                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    _context3.prev = 0;
                                    channel = _getChannel(req, message);
                                    targets = _getTarget(req, message);
                                    _context3.next = 5;
                                    return (0, _bluebird.map)(_coerceArray(targets), function () {
                                      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(target) {
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                          while (1) {
                                            switch (_context2.prev = _context2.next) {
                                              case 0:
                                                _context2.next = 2;
                                                return _emitter2.default.in(channel).emit('message', {
                                                  target: target,
                                                  action: 'refresh',
                                                  data: null
                                                });

                                              case 2:
                                              case 'end':
                                                return _context2.stop();
                                            }
                                          }
                                        }, _callee2, undefined);
                                      }));

                                      return function (_x11) {
                                        return _ref5.apply(this, arguments);
                                      };
                                    }());

                                  case 5:
                                    _context3.next = 10;
                                    break;

                                  case 7:
                                    _context3.prev = 7;
                                    _context3.t0 = _context3['catch'](0);


                                    process.stdout.write(_context3.t0);

                                  case 10:
                                  case 'end':
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, undefined, [[0, 7]]);
                          }));

                          return function (_x10) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 5:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x9) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function handleRefresh(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var handleMessages = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, trx, result, options) {
    var messageCreator;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            messageCreator = _getForAction(options.messages, options.action);

            if (messageCreator) {
              _context9.next = 3;
              break;
            }

            return _context9.abrupt('return');

          case 3:
            _context9.next = 5;
            return options.knex.transaction(function () {
              var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(trx) {
                var messages;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return messageCreator(req, trx, result, options);

                      case 2:
                        messages = _context8.sent;
                        _context8.next = 5;
                        return (0, _bluebird.map)(_coerceArray(messages), function () {
                          var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(message) {
                            var channel, targets;
                            return _regenerator2.default.wrap(function _callee7$(_context7) {
                              while (1) {
                                switch (_context7.prev = _context7.next) {
                                  case 0:
                                    _context7.prev = 0;
                                    channel = _getChannel(req, message);
                                    targets = _getTarget(req, message);
                                    _context7.next = 5;
                                    return (0, _bluebird.map)(_coerceArray(targets), function () {
                                      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(target) {
                                        return _regenerator2.default.wrap(function _callee6$(_context6) {
                                          while (1) {
                                            switch (_context6.prev = _context6.next) {
                                              case 0:
                                                _context6.next = 2;
                                                return _emitter2.default.in(channel).emit('message', {
                                                  target: target,
                                                  action: message.action,
                                                  data: (0, _format_object_for_transport2.default)(message.data)
                                                });

                                              case 2:
                                              case 'end':
                                                return _context6.stop();
                                            }
                                          }
                                        }, _callee6, undefined);
                                      }));

                                      return function (_x18) {
                                        return _ref9.apply(this, arguments);
                                      };
                                    }());

                                  case 5:
                                    _context7.next = 10;
                                    break;

                                  case 7:
                                    _context7.prev = 7;
                                    _context7.t0 = _context7['catch'](0);


                                    process.stdout.write(_context7.t0);

                                  case 10:
                                  case 'end':
                                    return _context7.stop();
                                }
                              }
                            }, _callee7, undefined, [[0, 7]]);
                          }));

                          return function (_x17) {
                            return _ref8.apply(this, arguments);
                          };
                        }());

                      case 5:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              }));

              return function (_x16) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function handleMessages(_x12, _x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

var _getChannel = function _getChannel(req, message) {

  if (_lodash2.default.isString(message)) return message;

  if (message.channel === 'admin') return '/teams/' + req.team.get('id');

  if (message.channel === 'session') return '/session';

  if (message.channel === 'team') return '/teams/' + req.team.get('id');

  if (message.channel === 'user') return '/users/' + req.user.get('id');

  if (message.channel) return message.channel;

  return null;
};

var _getTarget = function _getTarget(req, message) {

  if (message.target) return message.target;

  return _getChannel(req, message);
};

var _getForAction = function _getForAction(object, action) {

  if (!object) return null;

  if (_lodash2.default.isFunction(object)) return object;

  if (_lodash2.default.isFunction(object[action])) return object[action];

  return null;
};

var _coerceArray = function _coerceArray(value) {

  return !_lodash2.default.isArray(value) ? [value] : value;
};

exports.default = (0, _backframe.plugin)({
  afterCommit: afterCommit,
  name: 'refresher',
  options: {
    messages: {
      type: ['object', 'function'],
      required: false
    },
    refresh: {
      type: ['object', 'function'],
      required: false
    }
  }
});