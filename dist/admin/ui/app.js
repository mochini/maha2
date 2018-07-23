'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactFastclick = require('react-fastclick');

var _reactFastclick2 = _interopRequireDefault(_reactFastclick);

var _reactHotLoader = require('react-hot-loader');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _platform = require('packages/admin/platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactFastclick2.default)();

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App() {
    (0, _classCallCheck3.default)(this, App);
    return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  (0, _createClass3.default)(App, [{
    key: 'render',
    value: function render() {
      var appReducers = this.props.appReducers;

      return _react2.default.createElement(
        _root2.default,
        { reducers: appReducers },
        _react2.default.createElement(_platform2.default, this.props)
      );
    }
  }]);
  return App;
}(_react2.default.Component);

App.propTypes = {
  appBadges: _propTypes2.default.array,
  appReducers: _propTypes2.default.array,
  appRoutes: _propTypes2.default.array,
  appUserTasks: _propTypes2.default.array,
  appUserFields: _propTypes2.default.array,
  appUserValues: _propTypes2.default.array
};
exports.default = (0, _reactHotLoader.hot)(module)(App);