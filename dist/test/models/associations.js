'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_has_one = exports.test_belongs_to = exports.test_belongs_to_many = exports.test_has_many = exports.test_virtual = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test_virtual = exports.test_virtual = function test_virtual(model, key, conditions, value) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var object;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return model.where(conditions).fetch();

          case 2:
            object = _context.sent;


            (0, _chai.expect)(object.get(key)).to.equal(value);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var test_has_many = exports.test_has_many = function test_has_many(model, relation) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var object;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return model.where({ id: 1 }).fetch({ withRelated: [relation] });

          case 2:
            object = _context2.sent;


            (0, _chai.expect)(object.related(relation).relatedData.type).to.equal('hasMany');

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
};

var test_belongs_to_many = exports.test_belongs_to_many = function test_belongs_to_many(model, relation) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var object;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return model.where({ id: 1 }).fetch({ withRelated: [relation] });

          case 2:
            object = _context3.sent;


            (0, _chai.expect)(object.related(relation).relatedData.type).to.equal('belongsToMany');

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));
};

var test_belongs_to = exports.test_belongs_to = function test_belongs_to(model, relation) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var object;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return model.where({ id: 1 }).fetch({ withRelated: [relation] });

          case 2:
            object = _context4.sent;


            (0, _chai.expect)(object.related(relation).relatedData.type).to.equal('belongsTo');

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));
};

var test_has_one = exports.test_has_one = function test_has_one(model, relation, conditions) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var object;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return model.where(conditions).fetch({ withRelated: [relation] });

          case 2:
            object = _context5.sent;


            (0, _chai.expect)(object.related(relation).relatedData.type).to.equal('hasOne');

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));
};