'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authentication_middleware = require('../../lib/redux/authentication_middleware');

var _authentication_middleware2 = _interopRequireDefault(_authentication_middleware);

var _fingerprint_middleware = require('../../lib/redux/fingerprint_middleware');

var _fingerprint_middleware2 = _interopRequireDefault(_fingerprint_middleware);

var _token_middleware = require('../../lib/redux/token_middleware');

var _token_middleware2 = _interopRequireDefault(_token_middleware);

var _reduxSocketioClient = require('redux-socketio-client');

var _reduxSocketioClient2 = _interopRequireDefault(_reduxSocketioClient);

var _redux = require('redux');

var _reduxLocalStorage = require('redux-local-storage');

var _reduxLocalStorage2 = _interopRequireDefault(_reduxLocalStorage);

var _reduxRubberstamp = require('redux-rubberstamp');

var _reduxApiRequest = require('redux-api-request');

var _reduxApiRequest2 = _interopRequireDefault(_reduxApiRequest);

var _reduxLogger = require('redux-logger');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Reframe from 'reframe'


var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    _this.store = _this._getStore();
    return _this;
  }

  _createClass(Root, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        this.props.children
      );
    }
  }, {
    key: '_getStore',
    value: function _getStore() {
      var reducer = (0, _reduxRubberstamp.combineReducers)(this.props.reducers);

      var loggerMiddleware = (0, _reduxLogger.createLogger)({ collapsed: true });

      var apiRequestMiddleware = (0, _reduxApiRequest2.default)();

      var socketUrl = window.location.protocol + '//' + window.location.hostname + ':' + process.env.SOCKET_PORT;

      var socketioClientMiddleware = (0, _reduxSocketioClient2.default)({ url: socketUrl });

      var localStorageMiddleware = (0, _reduxLocalStorage2.default)();

      var middleware = [_reduxThunk2.default, _token_middleware2.default, _fingerprint_middleware2.default, apiRequestMiddleware, socketioClientMiddleware, localStorageMiddleware, _authentication_middleware2.default].concat(_toConsumableArray(process.env.NODE_ENV !== 'production' ? [loggerMiddleware] : []));

      var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, _toConsumableArray(middleware))(_redux.createStore);

      return createStoreWithMiddleware(reducer);
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Root;
}(_react2.default.Component);

Root.propTypes = {
  reducers: _propTypes2.default.array,
  children: _propTypes2.default.any
};
var _default = Root;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Root, 'Root', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;