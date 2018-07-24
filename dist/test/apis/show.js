'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test_show = undefined;

var _chai = require('chai');

var _utils = require('./utils');

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var test_show = exports.test_show = function test_show(router, path, data) {
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


            if (status === '200') {

              Object.keys(data).map(function (key) {

                (0, _chai.expect)(json.data[key]).to.equal(data[key]);
              });
            }

            (0, _chai.expect)(status).to.equal(200);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(test_show, 'test_show', 'unknown');
  leaveModule(module);
})();

;