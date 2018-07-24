'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _toureiro = require('toureiro');

var _toureiro2 = _interopRequireDefault(_toureiro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _process$env$REDIS_UR = process.env.REDIS_URL.match(/redis\:\/\/([\d\w\.]*)\:(\d*)\/(\d*)/),
    _process$env$REDIS_UR2 = _slicedToArray(_process$env$REDIS_UR, 4),
    host = _process$env$REDIS_UR2[1],
    port = _process$env$REDIS_UR2[2],
    db = _process$env$REDIS_UR2[3];

var toureiroMiddleware = (0, _toureiro2.default)({ redis: { port: port, host: host, db: db } });

var _default = toureiroMiddleware;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(host, 'host', 'unknown');
  reactHotLoader.register(port, 'port', 'unknown');
  reactHotLoader.register(db, 'db', 'unknown');
  reactHotLoader.register(toureiroMiddleware, 'toureiroMiddleware', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;