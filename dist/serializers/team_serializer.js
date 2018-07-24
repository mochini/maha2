'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = require('../objects/serializer');

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teamSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    title: result.get('title'),

    subdomain: result.get('subdomain'),

    color: result.get('color'),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

exports.default = teamSerializer;