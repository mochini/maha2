'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asset = require('../services/asset');

var _queue = require('../objects/queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var enqueue = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, trx, asset_id) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', { asset_id: asset_id });

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
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _asset.assembleAsset)(job.data.asset_id, trx);

          case 2:
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

var assembleAssetQueue = new _queue2.default({
  name: 'assemble_asset',
  enqueue: enqueue,
  processor: processor
});

var _default = assembleAssetQueue;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(enqueue, 'enqueue', 'unknown');
  reactHotLoader.register(processor, 'processor', 'unknown');
  reactHotLoader.register(assembleAssetQueue, 'assembleAssetQueue', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;