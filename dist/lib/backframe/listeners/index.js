'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _listening = require('../../../../models/listening');

var _listening2 = _interopRequireDefault(_listening);

var _backframe = require('backframe');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// options.listeners is a function that returns a list of user_ids who are listening to activity
// on this item. If the listener doesnt already exists, we add them to the list

var afterProcessor = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, result, options) {
    var listenerCreator, listener_ids, team_id, listenable_type, listenable_id, active_listeners, active_listener_ids;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (options.listeners) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return');

          case 2:
            listenerCreator = _getListener(options);

            if (listenerCreator) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return');

          case 5:
            _context2.next = 7;
            return listenerCreator(req, trx, result, options);

          case 7:
            listener_ids = _context2.sent;

            if (!(listener_ids.length === 0)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt('return');

          case 10:
            team_id = req.team.get('id');
            listenable_type = options.model.extend().__super__.tableName;
            listenable_id = result.get('id');
            _context2.next = 15;
            return _listening2.default.where({ team_id: team_id, listenable_type: listenable_type, listenable_id: listenable_id }).fetchAll({ transacting: trx });

          case 15:
            active_listeners = _context2.sent;
            active_listener_ids = active_listeners.map(function (listener) {
              return listener.get('user_id');
            });
            _context2.next = 19;
            return (0, _bluebird.mapSeries)(listener_ids, function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user_id) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!_lodash2.default.includes(active_listener_ids, user_id)) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt('return');

                      case 2:
                        data = {
                          team_id: team_id,
                          listenable_type: listenable_type,
                          listenable_id: listenable_id,
                          user_id: user_id
                        };
                        _context.next = 5;
                        return _listening2.default.forge(data).save(null, { transacting: trx });

                      case 5:
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

          case 19:
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

var _getListener = function _getListener(options) {

  if (_lodash2.default.isFunction(options.listeners)) return options.listeners;

  return _lodash2.default.isPlainObject(options.listeners) ? options.listeners[options.action] : false;
};

exports.default = (0, _backframe.plugin)({
  name: 'listeners',
  options: {
    listeners: {
      type: 'object',
      required: false
    }
  },
  afterProcessor: afterProcessor
});