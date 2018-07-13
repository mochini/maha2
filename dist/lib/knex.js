'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

require('./environment');

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env$DATABASE = process.env.DATABASE_URL.match(/(.*)\:\/\/\/?(.*)/),
    _process$env$DATABASE2 = (0, _slicedToArray3.default)(_process$env$DATABASE, 3),
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

exports.default = knex;