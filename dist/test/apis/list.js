'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_list_search = exports.test_list_sort = exports.test_list = undefined;

var _chai = require('chai');

var _utils = require('./utils');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var test_list = exports.test_list = function test_list(router, path, count) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var request, _ref2, status, json;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = {
              method: 'get',
              path: path
            };
            _context.next = 3;
            return (0, _utils.make_authenticated_request)(router, request);

          case 3:
            _ref2 = _context.sent;
            status = _ref2.status;
            json = _ref2.json;


            (0, _chai.expect)(json.pagination.total).to.equal(count);

            (0, _chai.expect)(status).to.equal(200);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var test_list_sort = exports.test_list_sort = function test_list_sort(router, path, field, direction, data) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var $sort, request, _ref4, status, json;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            $sort = direction === 'desc' ? '-' + field : field;
            request = {
              method: 'get',
              path: path,
              query: { $sort: $sort }
            };
            _context2.next = 4;
            return (0, _utils.make_authenticated_request)(router, request);

          case 4:
            _ref4 = _context2.sent;
            status = _ref4.status;
            json = _ref4.json;


            if (status === '200') {

              Object.keys(data).map(function (key) {

                (0, _chai.expect)(json.data[0][key]).to.equal(data[key]);
              });
            }

            (0, _chai.expect)(status).to.equal(200);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));
};

var test_list_search = exports.test_list_search = function test_list_search(router, path, q, data) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var request, _ref6, status, json;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            request = {
              method: 'get',
              path: path,
              query: { $filter: { q: q } }
            };
            _context3.next = 3;
            return (0, _utils.make_authenticated_request)(router, request);

          case 3:
            _ref6 = _context3.sent;
            status = _ref6.status;
            json = _ref6.json;


            if (status === '200') {

              Object.keys(data).map(function (key) {

                (0, _chai.expect)(json.data[0][key]).to.equal(data[key]);
              });
            }

            (0, _chai.expect)(status).to.equal(200);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(test_list, 'test_list', 'unknown');
  reactHotLoader.register(test_list_sort, 'test_list_sort', 'unknown');
  reactHotLoader.register(test_list_search, 'test_list_search', 'unknown');
  leaveModule(module);
})();

;