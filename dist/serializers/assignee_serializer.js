'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = require('../objects/serializer');

var _serializer2 = _interopRequireDefault(_serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssigneeSerializer = (0, _serializer2.default)(function (req, trx, result) {
  return {

    id: result.get('id'),

    type: result.get('type'),

    item_id: result.get('item_id'),

    name: result.get('name'),

    initials: result.get('initials'),

    photo: result.related('photo') ? result.related('photo').get('path') : null,

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

exports.default = AssigneeSerializer;