'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queue = require('../objects/queue');

var _queue2 = _interopRequireDefault(_queue);

var _aws = require('../lib/aws');

var _aws2 = _interopRequireDefault(_aws);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var enqueue = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, trx, message) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', message);

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
    var _job$data, filepath, meta, code, s3, Key, file, mailbox, email;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _job$data = job.data, filepath = _job$data.filepath, meta = _job$data.meta, code = _job$data.code;
            s3 = new _aws2.default.S3();
            Key = 'emails/' + code;
            _context2.next = 5;
            return s3.getObject({
              Bucket: process.env.AWS_BUCKET,
              Key: Key
            }).promise();

          case 5:
            file = _context2.sent;
            mailbox = require(_path2.default.resolve(filepath)).default;
            email = JSON.parse(file.Body);
            _context2.next = 10;
            return mailbox.processor(meta, email, trx);

          case 10:
            _context2.next = 12;
            return s3.deleteObjects({
              Bucket: process.env.AWS_BUCKET,
              Delete: {
                Objects: [{ Key: Key }]
              }
            }).promise();

          case 12:
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

var mailboxQueue = new _queue2.default({
  name: 'mailbox',
  enqueue: enqueue,
  processor: processor
});

var _default = mailboxQueue;
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
  reactHotLoader.register(mailboxQueue, 'mailboxQueue', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;