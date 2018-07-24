'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serializer = require('../objects/serializer');

var _serializer2 = _interopRequireDefault(_serializer);

var _model_activities = require('../utils/model_activities');

var _model_activities2 = _interopRequireDefault(_model_activities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var notificationSerializer = (0, _serializer2.default)(function (req, trx, result) {

  var user = userData(result.related('user'));

  var subject = userData(result.related('subject'));

  var object = objectData(result);

  var subject_text = subjectText(subject, user);

  var article_text = articleText(subject, object, user);

  var object_text = objectText(subject, object, user);

  var story = result.related('story').get('text');

  var description = [];

  if (subject_text) description.push(subject_text);

  description.push(story.replace('{object}', '' + article_text + object_text));

  return {

    id: result.get('id'),

    code: result.get('code'),

    url: result.get('url'),

    is_seen: result.get('is_seen'),

    is_visited: result.get('is_visited'),

    app: app(result.related('app')),

    user: user,

    subject: subject,

    object: object,

    subject_text: subject_text,

    article_text: article_text,

    story: story,

    object_text: object_text,

    description: description.join(' '),

    created_at: result.get('created_at'),

    updated_at: result.get('updated_at')

  };
});

var app = function app(_app) {
  return {

    id: _app.get('id'),

    title: _app.get('title'),

    color: _app.get('color'),

    icon: _app.get('icon')

  };
};

var userData = function userData(result) {

  if (!result.id) return null;

  return {

    id: result.get('id'),

    first_name: result.get('first_name'),

    last_name: result.get('last_name'),

    full_name: result.get('full_name'),

    initials: result.get('initials'),

    rfc822: result.get('rfc822'),

    photo: result.related('photo').get('path')

  };
};

var objectData = function objectData(result) {

  var model = (0, _model_activities2.default)(result.get('object_table'));

  if (!result.get('object_text')) return null;

  return {

    id: result.get('object_id'),

    owner_id: result.get('object_owner_id'),

    owner_full_name: result.related('object_owner').get('full_name'),

    type: model.displayName,

    text: result.get('object_text')

  };
};

var subjectText = function subjectText(subject, user) {

  if (!subject) return null;

  return subject.id === user.id ? 'You' : subject.full_name;
};

var articleText = function articleText(subject, object, user) {
  var type = object.type ? ' ' + object.type : '';
  if (object.owner_id === null) {
    return 'the' + type + ' ';
  } else if (object.owner_id === user.id && (subject.id !== object.owner_id || !object.id)) {
    return 'your' + type + ' ';
  } else if (object.owner_id !== user.id && subject.id !== object.owner_id) {
    return object.owner_full_name + '\'s' + type + ' ';
  } else if (object.owner_id !== user.id && object.owner_id === subject.id) {
    return 'their' + type + ' ';
  } else {
    return 'the' + type + ' ';
  }
};

var objectText = function objectText(subject, object, user) {
  if (object.type === 'user' && object.id === user.id) {
    return 'yourself';
  } else if (object.type === 'user' && object.id === subject.id) {
    return 'themself';
  }
  return object.text;
};

var _default = notificationSerializer;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(notificationSerializer, 'notificationSerializer', 'unknown');
  reactHotLoader.register(app, 'app', 'unknown');
  reactHotLoader.register(userData, 'userData', 'unknown');
  reactHotLoader.register(objectData, 'objectData', 'unknown');
  reactHotLoader.register(subjectText, 'subjectText', 'unknown');
  reactHotLoader.register(articleText, 'articleText', 'unknown');
  reactHotLoader.register(objectText, 'objectText', 'unknown');
  reactHotLoader.register(_default, 'default', 'unknown');
  leaveModule(module);
})();

;