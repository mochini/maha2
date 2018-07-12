'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fingerprintMiddleware = function fingerprintMiddleware(store) {
  return function (next) {
    return function (action) {
      var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
          _action$type$match2 = (0, _slicedToArray3.default)(_action$type$match, 3),
          type = _action$type$match2[2];

      if (type !== 'API_REQUEST') return next(action);

      var admin = store.getState().maha.admin;

      var fingerprint = action.fingerprint || admin.fingerprint;

      next((0, _extends3.default)({}, action, {
        headers: (0, _extends3.default)({}, action.headers, {
          'Fingerprint': fingerprint
        })
      }));
    };
  };
};

exports.default = fingerprintMiddleware;