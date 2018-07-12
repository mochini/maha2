'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ioredis = require('ioredis');

var _ioredis2 = _interopRequireDefault(_ioredis);

var _bull = require('bull');

var _bull2 = _interopRequireDefault(_bull);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Queue = function () {
  function Queue(options) {
    (0, _classCallCheck3.default)(this, Queue);


    this._enqueue = options.enqueue;

    this.name = options.name;

    this.processor = options.processor;

    this.failed = options.failed;

    this.completed = options.completed;

    this.queue = new _bull2.default(this.name, null, null, { createClient: createClient });
  }

  (0, _createClass3.default)(Queue, [{
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                if (this.processor) this.queue.process(wrapped(this.name, this.processor));

                if (this.failed) this.queue.on('failed', this.failed);

                if (this.completed) this.queue.on('completed', this.completed);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start(_x) {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'enqueue',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, trx, options) {
        var _this = this;

        var job;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._enqueue(req, trx, options);

              case 2:
                job = _context2.sent;

                if (!(process.env.NODE_ENV === 'test')) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return');

              case 5:
                _context2.next = 7;
                return new _bluebird2.default(function (resolve, reject) {

                  setTimeout(function () {

                    _this.queue.add(job, { delay: 2000, attempts: 3, backoff: 5000 });

                    resolve();
                  }, 500);
                });

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function enqueue(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return enqueue;
    }()
  }, {
    key: 'clean',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(type) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.queue.clean(0, type);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function clean(_x5) {
        return _ref3.apply(this, arguments);
      }

      return clean;
    }()
  }, {
    key: 'getJob',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(job_id) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.queue.getJob(job_id);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getJob(_x6) {
        return _ref4.apply(this, arguments);
      }

      return getJob;
    }()
  }]);
  return Queue;
}();

var wrapped = function wrapped(name, processor) {
  return function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(job, done) {
      var processorWithTransaction, processorWithLogger, is_prod, envProcessor;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              processorWithTransaction = withTransaction(processor, job);
              processorWithLogger = withLogger(name, processorWithTransaction, job);
              is_prod = process.env.NODE_ENV === 'production';
              envProcessor = !is_prod ? processorWithLogger : processorWithTransaction;
              _context5.prev = 4;
              _context5.next = 7;
              return envProcessor();

            case 7:

              done();

              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5['catch'](4);


              done(_context5.t0);

            case 13:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[4, 10]]);
    }));

    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var withLogger = function withLogger(name, processor, job) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return processor();

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));
};

var withTransaction = function withTransaction(processor, job) {
  return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return knex.transaction(function () {
              var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(trx) {
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return processor(job, trx);

                      case 3:
                        _context7.next = 5;
                        return trx.commit();

                      case 5:
                        _context7.next = 11;
                        break;

                      case 7:
                        _context7.prev = 7;
                        _context7.t0 = _context7['catch'](0);
                        _context7.next = 11;
                        return trx.rollback(_context7.t0);

                      case 11:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined, [[0, 7]]);
              }));

              return function (_x9) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));
};

var client = new _ioredis2.default(process.env.REDIS_URL);

var subscriber = new _ioredis2.default(process.env.REDIS_URL);

var createClient = function createClient(type) {

  if (type === 'client') return client;

  if (type === 'subscriber') return subscriber;

  return new _ioredis2.default(process.env.REDIS_URL);
};

exports.default = Queue;