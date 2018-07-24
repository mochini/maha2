'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_datestring = exports.test_currency = exports.test_uniqueness = exports.test_required = undefined;

var _chai = require('chai');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var test_required = exports.test_required = function test_required(model, field) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return model.forge({}).save();

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);


            (0, _chai.expect)(_context.t0.errors[field].message).to.equal('The ' + field + ' is required');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));
};

var test_uniqueness = exports.test_uniqueness = function test_uniqueness(model, field) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var original;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return model.where({ id: 1 }).fetch();

          case 2:
            original = _context2.sent;
            _context2.prev = 3;
            _context2.next = 6;
            return model.forge(_defineProperty({}, field, original.get(field))).save();

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](3);


            (0, _chai.expect)(_context2.t0.errors[field].message).to.equal('The ' + field + ' is already in use');

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 8]]);
  }));
};

var test_currency = exports.test_currency = function test_currency(model, field) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return model.forge(_defineProperty({}, field, 'not a currency')).save();

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3['catch'](0);


            (0, _chai.expect)(_context3.t0.errors[field].message).to.equal('The ' + field + ' must be valid currency');

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 5]]);
  }));
};

var test_datestring = exports.test_datestring = function test_datestring(model, field) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return model.forge(_defineProperty({}, field, 'not a datestring')).save();

          case 3:
            _context4.next = 8;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4['catch'](0);


            (0, _chai.expect)(_context4.t0.errors[field].message).to.equal('The ' + field + ' must be in the format YYYY-MM-DD');

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 5]]);
  }));
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(test_required, 'test_required', 'unknown');
  reactHotLoader.register(test_uniqueness, 'test_uniqueness', 'unknown');
  reactHotLoader.register(test_currency, 'test_currency', 'unknown');
  reactHotLoader.register(test_datestring, 'test_datestring', 'unknown');
  leaveModule(module);
})();

;