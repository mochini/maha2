'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ioredis = require('ioredis');

var _ioredis2 = _interopRequireDefault(_ioredis);

var _bull = require('bull');

var _bull2 = _interopRequireDefault(_bull);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = function () {
  function Queue(options) {
    _classCallCheck(this, Queue);

    this._enqueue = options.enqueue;

    this.name = options.name;

    this.processor = options.processor;

    this.failed = options.failed;

    this.completed = options.completed;

    this.queue = new _bull2.default(this.name, null, null, { createClient: createClient });
  }

  _createClass(Queue, [{
    key: 'start',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, trx, options) {
        var _this = this;

        var job;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                return new Promise(function (resolve, reject) {

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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(type) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(job_id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Queue;
}();

var wrapped = function wrapped(name, processor) {
  return function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(job, done) {
      var processorWithTransaction, processorWithLogger, is_prod, envProcessor;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
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
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return knex.transaction(function () {
              var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(trx) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
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

var _default = Queue;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Queue, 'Queue', 'unknown');
  reactHotLoader.register(wrapped, 'wrapped', 'unknown');
  reactHotLoader.register(withLogger, 'withLogger', 'unknown');
  reactHotLoader.register(withTransaction, 'withTransaction', 'unknown');
  reactHotLoader.register(client, 'client', 'unknown');
  reactHotLoader.register(subscriber, 'subscriber', 'unknown');
  reactHotLoader.register(createClient, 'createClient', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;