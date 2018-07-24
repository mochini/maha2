'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('./environment');

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _process$env$DATABASE = process.env.DATABASE_URL.match(/(.*)\:\/\/\/?(.*)/),
    _process$env$DATABASE2 = _slicedToArray(_process$env$DATABASE, 3),
    url = _process$env$DATABASE2[0],
    protocol = _process$env$DATABASE2[1],
    database = _process$env$DATABASE2[2];

var getClient = function getClient(protocol) {

  if (protocol === 'postgres') return 'postgresql';

  return protocol;
};

var getConnection = function getConnection(protocol, url) {
  return url;
};

var getPool = function getPool(env) {
  return {
    min: env === 'test' ? 1 : 5,
    max: env === 'test' ? 1 : 30
  };
};

var config = {
  client: getClient(protocol),
  connection: getConnection(protocol, url),
  useNullAsDefault: true,
  pool: getPool(process.env.NODE_ENV)
};

var knex = new _knex2.default(config);

var _default = knex;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(url, 'url', 'unknown');
  reactHotLoader.register(protocol, 'protocol', 'unknown');
  reactHotLoader.register(database, 'database', 'unknown');
  reactHotLoader.register(getClient, 'getClient', 'unknown');
  reactHotLoader.register(getConnection, 'getConnection', 'unknown');
  reactHotLoader.register(getPool, 'getPool', 'unknown');
  reactHotLoader.register(config, 'config', 'unknown');
  reactHotLoader.register(knex, 'knex', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;