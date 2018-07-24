'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = require('../objects/serializer');

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    full_name: result.get('full_name'),

    initials: result.get('initials'),

    email: result.get('email'),

    photo: result.related('photo').get('path')

  };
});

exports.default = userSerializer;