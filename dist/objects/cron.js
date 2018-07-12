'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _knex = require('../lib/knex');

var _knex2 = _interopRequireDefault(_knex);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { beginLogger, endLogger, printCronLogger } from '../utils/logger'
var cron = function cron(options) {

  return {
    schedule: options.schedule,
    handler: function handler() {
      return withLogger({
        name: options.name,
        processor: options.processor,
        afterCommit: options.afterCommit,
        beforeRollback: options.beforeRollback
      });
    }
  };
};

var withLogger = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var name = _ref2.name,
        processor = _ref2.processor,
        afterCommit = _ref2.afterCommit,
        beforeRollback = _ref2.beforeRollback;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return withTransaction({ processor: processor, afterCommit: afterCommit, beforeRollback: beforeRollback });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function withLogger(_x) {
    return _ref.apply(this, arguments);
  };
}();

var withTransaction = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref4) {
    var processor = _ref4.processor,
        afterCommit = _ref4.afterCommit,
        beforeRollback = _ref4.beforeRollback;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _knex2.default.transaction(function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(trx) {
                var result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return processor(trx);

                      case 3:
                        result = _context2.sent;
                        _context2.next = 6;
                        return trx.commit();

                      case 6:
                        if (!afterCommit) {
                          _context2.next = 9;
                          break;
                        }

                        _context2.next = 9;
                        return afterCommit(trx, result);

                      case 9:
                        _context2.next = 19;
                        break;

                      case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](0);


                        console.log(_context2.t0);

                        if (!beforeRollback) {
                          _context2.next = 17;
                          break;
                        }

                        _context2.next = 17;
                        return beforeRollback(trx);

                      case 17:
                        _context2.next = 19;
                        return trx.rollback(_context2.t0);

                      case 19:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined, [[0, 11]]);
              }));

              return function (_x3) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function withTransaction(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = cron;