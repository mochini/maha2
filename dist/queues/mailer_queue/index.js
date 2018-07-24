'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _collect_objects = require('../../utils/collect_objects');

var _collect_objects2 = _interopRequireDefault(_collect_objects);

var _email_link = require('../../models/email_link');

var _email_link2 = _interopRequireDefault(_email_link);

var _send_mail = require('../../utils/send_mail');

var _send_mail2 = _interopRequireDefault(_send_mail);

var _queue = require('../../objects/queue');

var _queue2 = _interopRequireDefault(_queue);

var _email = require('../../models/email');

var _email2 = _interopRequireDefault(_email);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootPath = _path2.default.resolve(__dirname, '..', '..', '..', 'src', 'emails');

var envelopeTemplate = _fs2.default.readFileSync(_path2.default.join(rootPath, 'envelope.ejs')).toString();

var enqueue = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
    var templates, template, team, innerContent, html, data, email, email_id;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            templates = (0, _collect_objects2.default)('emails/*').reduce(function (emails, email) {

              var config = require(email.filepath).default;

              var templatePath = _path2.default.dirname(email.filepath).replace('dist', 'src');

              return (0, _extends4.default)({}, emails, (0, _defineProperty3.default)({}, config.code, {
                subject: config.subject,
                envelope: config.envelope,
                html: _fs2.default.readFileSync(_path2.default.join(templatePath, 'html.ejs')).toString()
              }));
            }, {});
            template = templates[options.template];

            if (!req.team) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return req.team.load('logo', { transacting: trx });

          case 5:
            team = req.team ? req.team.toJSON() : null;


            options.data = (0, _extends4.default)({
              moment: _moment2.default,
              numeral: _numeral2.default,
              pluralize: _pluralize2.default,
              team: team
            }, options.data);

            innerContent = _ejs2.default.render(template.html, options.data);
            html = template.envelope !== null ? _ejs2.default.render(envelopeTemplate, (0, _extends4.default)({}, options.data, { content: innerContent })) : innerContent;
            data = {
              team_id: options.team_id,
              user_id: options.user ? options.user.get('id') : null,
              to: options.to || options.user.get('rfc822'),
              subject: _ejs2.default.render(template.subject, options.data),
              html: html,
              code: _lodash2.default.random(100000, 999999).toString(36)
            };
            _context.next = 12;
            return _email2.default.forge(data).save(null, { transacting: trx });

          case 12:
            email = _context.sent;
            email_id = email.get('id');
            return _context.abrupt('return', { email_id: email_id });

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function enqueue(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var processor = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(job, trx) {
    var conditions, email, team, parsed, links, rendered, mapped, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            conditions = {
              id: job.data.email_id
            };
            _context3.next = 3;
            return _email2.default.where(conditions).fetch({ withRelated: ['team'], transacting: trx });

          case 3:
            email = _context3.sent;
            team = email.related('team');
            parsed = _cheerio2.default.load(email.get('html'));
            _context3.next = 8;
            return parsed('<img src="' + process.env.WEB_HOST + '/v' + email.get('code') + '" />').appendTo('body');

          case 8:
            _context3.next = 10;
            return parsed('a').map(function (i, elem) {
              return {
                text: parsed(elem).text(),
                url: parsed(elem).attr('href')
              };
            }).get();

          case 10:
            links = _context3.sent;
            rendered = {
              from: team.get('title') + ' <mailer@mahaplatform.com>',
              to: email.get('to'),
              subject: email.get('subject'),
              html: parsed.html()
            };
            _context3.next = 14;
            return (0, _bluebird.reduce)(links, function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(rendered, link) {
                var emailLink, newUrl;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _findOrCreateLink(email, link, trx);

                      case 2:
                        emailLink = _context2.sent;
                        newUrl = process.env.WEB_HOST + '/c' + email.get('code') + emailLink.get('code');
                        return _context2.abrupt('return', (0, _extends4.default)({}, rendered, {
                          html: rendered.html.replace(link.url, newUrl)
                        }));

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x6, _x7) {
                return _ref3.apply(this, arguments);
              };
            }(), rendered);

          case 14:
            mapped = _context3.sent;
            _context3.next = 17;
            return (0, _send_mail2.default)(mapped);

          case 17:
            result = _context3.sent;
            _context3.next = 20;
            return email.save(result, { patch: true, transacting: trx });

          case 20:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function processor(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var _findOrCreateLink = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(email, link, trx) {
    var emailLink, data;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _email_link2.default.where(link).fetch({ transacting: trx });

          case 2:
            emailLink = _context4.sent;

            if (!emailLink) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', emailLink);

          case 5:
            data = (0, _extends4.default)({
              team_id: email.get('team_id'),
              code: _lodash2.default.random(100000, 999999).toString(36)
            }, link);
            _context4.next = 8;
            return _email_link2.default.forge(data).save(null, { transacting: trx });

          case 8:
            return _context4.abrupt('return', _context4.sent);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function _findOrCreateLink(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var mailerQueue = new _queue2.default({
  name: 'mailer',
  enqueue: enqueue,
  processor: processor
});

exports.default = mailerQueue;