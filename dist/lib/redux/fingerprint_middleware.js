'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var fingerprintMiddleware = function fingerprintMiddleware(store) {
  return function (next) {
    return function (action) {
      var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
          _action$type$match2 = _slicedToArray(_action$type$match, 3),
          type = _action$type$match2[2];

      if (type !== 'API_REQUEST') return next(action);

      var admin = store.getState().maha.admin;

      var fingerprint = action.fingerprint || admin.fingerprint;

      next(_extends({}, action, {
        headers: _extends({}, action.headers, {
          'Fingerprint': fingerprint
        })
      }));
    };
  };
};

var _default = fingerprintMiddleware;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(fingerprintMiddleware, 'fingerprintMiddleware', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;