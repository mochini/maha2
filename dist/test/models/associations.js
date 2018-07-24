'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_has_one = exports.test_belongs_to = exports.test_belongs_to_many = exports.test_has_many = exports.test_virtual = undefined;

var _chai = require('chai');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var test_virtual = exports.test_virtual = function test_virtual(model, key, conditions, value) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var object;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var object;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var object;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var object;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var object;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
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
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(test_virtual, 'test_virtual', 'unknown');
  reactHotLoader.register(test_has_many, 'test_has_many', 'unknown');
  reactHotLoader.register(test_belongs_to_many, 'test_belongs_to_many', 'unknown');
  reactHotLoader.register(test_belongs_to, 'test_belongs_to', 'unknown');
  reactHotLoader.register(test_has_one, 'test_has_one', 'unknown');
  leaveModule(module);
})();

;