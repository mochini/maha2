'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getNormalizedFileName = exports.deleteAsset = exports.createAsset = exports.getAsset = exports.processAsset = exports.assembleAsset = exports.uploadChunk = exports.checkUploadedFile = exports.validateRequest = undefined;

var _asset_serializer = require('../serializers/asset_serializer');

var _asset_serializer2 = _interopRequireDefault(_asset_serializer);

var _assemble_asset_queue = require('../queues/assemble_asset_queue');

var _assemble_asset_queue2 = _interopRequireDefault(_assemble_asset_queue);

var _process_asset_queue = require('../queues/process_asset_queue');

var _process_asset_queue2 = _interopRequireDefault(_process_asset_queue);

var _backframe = require('backframe');

var _asset = require('../models/asset');

var _asset2 = _interopRequireDefault(_asset);

var _emitter = require('../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _webshot = require('webshot');

var _webshot2 = _interopRequireDefault(_webshot);

var _aws = require('../lib/aws');

var _aws2 = _interopRequireDefault(_aws);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var simpleParser = Promise.promisify(require('mailparser').simpleParser);

var execAsync = Promise.promisify(require('child_process').exec);

var validateRequest = exports.validateRequest = function validateRequest(params, files, requireFile) {

  var maxChunkSize = 1024 * 128;

  var maxFileSize = 1024 * 1024 * 20;

  var chunkNumber = params.resumableChunkNumber;

  var chunkSize = params.resumableChunkSize;

  var totalSize = params.resumableTotalSize;

  var identifier = params.resumableIdentifier;

  var filename = params.resumableFilename;

  var totalChunks = params.resumableTotalChunks;

  if (!chunkNumber || !chunkSize || !totalSize || !identifier || !filename || !totalChunks) {
    throw new _backframe.BackframeError({ code: 500, message: 'non_resumable_request' });
  }

  if (parseInt(chunkNumber) > parseInt(totalChunks)) {
    throw new _backframe.BackframeError({ code: 500, message: 'invalid_resumable_request1' });
  }

  if (parseInt(chunkSize) > parseInt(maxChunkSize)) {
    throw new _backframe.BackframeError({ code: 500, message: 'invalid_resumable_request2' });
  }

  if (parseInt(totalSize) > parseInt(maxFileSize)) {
    throw new _backframe.BackframeError({ code: 500, message: 'invalid_resumable_request3' });
  }

  if (!requireFile) return;

  var filesize = files['file'].size;

  if (!files['file'] || !files['file'].size) {
    throw new _backframe.BackframeError({ code: 500, message: 'invalid_resumable_request4' });
  }

  if (parseInt(chunkNumber) < parseInt(totalChunks) && parseInt(filesize) != parseInt(chunkSize)) {
    throw new _backframe.BackframeError({ code: 500, message: 'invalid_resumable_request5' });
  }
};

var checkUploadedFile = exports.checkUploadedFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, trx) {
    var chunkFilename, exists;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chunkFilename = _getChunkFilename(req.query.resumableIdentifier, req.query.resumableChunkNumber);
            _context.next = 3;
            return _chunkExists(chunkFilename);

          case 3:
            exists = _context.sent;

            if (exists) {
              _context.next = 6;
              break;
            }

            throw new _backframe.BackframeError({ code: 204, message: 'not_found' });

          case 6:
            return _context.abrupt('return', 'found');

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function checkUploadedFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var uploadChunk = exports.uploadChunk = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, trx) {
    var identifier, chunkFilename, filedata, chunks, chunkArray, completed, data, asset;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            identifier = _cleanIdentifier(req.body.resumableIdentifier);
            chunkFilename = _getChunkFilename(identifier, req.body.resumableChunkNumber);


            _fs2.default.renameSync(req.files['file'].path, chunkFilename);

            filedata = _fs2.default.readFileSync(chunkFilename);
            _context2.next = 6;
            return _saveFile(filedata, chunkFilename, 'application/octet-stream');

          case 6:
            _context2.next = 8;
            return _unlinkChunk(chunkFilename);

          case 8:
            _context2.next = 10;
            return _listChunks();

          case 10:
            chunks = _context2.sent;
            chunkArray = [].concat(_toConsumableArray(Array(parseInt(req.body.resumableTotalChunks))));
            completed = chunkArray.reduce(function (completed, chunk, index) {

              return completed ? _lodash2.default.includes(chunks, _getChunkFilename(identifier, index + 1)) : false;
            }, true);

            if (completed) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt('return', 'partly_done');

          case 15:
            data = {
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: 1,
              original_file_name: req.body.resumableFilename,
              file_name: _getNormalizedFileName(req.body.resumableFilename),
              content_type: req.body.resumableType,
              file_size: req.body.resumableTotalSize,
              chunks_total: req.body.resumableTotalChunks,
              status_id: 1
            };
            _context2.next = 18;
            return _asset2.default.forge(data).save(null, { transacting: trx });

          case 18:
            asset = _context2.sent;

            if (asset) {
              _context2.next = 21;
              break;
            }

            throw new _backframe.BackframeError({ code: 500, message: 'Unable to create asset' });

          case 21:
            _context2.next = 23;
            return _assemble_asset_queue2.default.enqueue(req, trx, asset.get('id'));

          case 23:
            _context2.next = 25;
            return (0, _asset_serializer2.default)(req, trx, asset);

          case 25:
            return _context2.abrupt('return', _context2.sent);

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function uploadChunk(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var assembleAsset = exports.assembleAsset = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, trx) {
    var asset, fileData, normalizedData, status_id;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _asset2.default.where({ id: id }).fetch({ transacting: trx });

          case 2:
            asset = _context3.sent;

            if (asset) {
              _context3.next = 5;
              break;
            }

            throw new Error('Unable to find asset');

          case 5:
            _context3.next = 7;
            return _getAssembledData(asset);

          case 7:
            fileData = _context3.sent;
            _context3.next = 10;
            return _getNormalizedData(asset, fileData);

          case 10:
            normalizedData = _context3.sent;
            _context3.next = 13;
            return _saveFile(normalizedData, 'assets/' + asset.get('id') + '/' + asset.get('file_name'), asset.get('content_type'));

          case 13:
            _context3.next = 15;
            return _deleteChunks(asset);

          case 15:
            status_id = asset.get('has_preview') ? 2 : 3;
            _context3.next = 18;
            return asset.save({ status_id: status_id }, { transacting: trx });

          case 18:
            if (!asset.get('has_preview')) {
              _context3.next = 21;
              break;
            }

            _context3.next = 21;
            return _process_asset_queue2.default.enqueue(null, trx, asset.get('id'));

          case 21:
            _context3.next = 23;
            return _emitter2.default.in('/assets/' + asset.get('id')).emit('message', {
              target: '/assets/' + asset.get('id'),
              action: 'refresh',
              data: (0, _asset_serializer2.default)(null, null, asset)
            });

          case 23:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function assembleAsset(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var processAsset = exports.processAsset = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, trx) {
    var asset, fileData, previewData;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _asset2.default.where({ id: id }).fetch({ transacting: trx });

          case 2:
            asset = _context4.sent;

            if (asset) {
              _context4.next = 5;
              break;
            }

            throw new Error('Unable to find asset');

          case 5:
            _context4.next = 7;
            return _getAsset(asset);

          case 7:
            fileData = _context4.sent;
            _context4.next = 10;
            return _getPreviewData(asset, fileData, 'jpg');

          case 10:
            previewData = _context4.sent;
            _context4.next = 13;
            return _saveFile(previewData, 'assets/' + asset.get('id') + '/preview.jpg', 'image/jpeg');

          case 13:
            _context4.next = 15;
            return asset.save({ status_id: 3 }, { transacting: trx });

          case 15:
            _context4.next = 17;
            return _emitter2.default.in('/assets/' + asset.get('id')).emit('message', {
              target: '/assets/' + asset.get('id'),
              action: 'refresh',
              data: (0, _asset_serializer2.default)(null, null, asset)
            });

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function processAsset(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getAsset = exports.getAsset = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, trx) {
    var asset;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _asset2.default.where({ id: id }).fetch({ transacting: trx });

          case 2:
            asset = _context5.sent;

            if (asset) {
              _context5.next = 5;
              break;
            }

            throw new Error('Unable to find asset');

          case 5:
            _context5.next = 7;
            return _getAsset(asset);

          case 7:
            return _context5.abrupt('return', _context5.sent);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getAsset(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var createAsset = exports.createAsset = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(meta, trx) {
    var file_size, data, asset, normalizedData, previewData;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            file_size = meta.file_size || _getFilesize(meta.file_data);
            data = {
              team_id: meta.team_id,
              user_id: meta.user_id,
              source_id: meta.source_id,
              source_identifier: meta.source_identifier,
              source_url: meta.source_url,
              original_file_name: meta.file_name,
              file_name: _getNormalizedFileName(meta.file_name),
              content_type: meta.content_type,
              file_size: file_size,
              chunks_total: 1,
              status_id: 2
            };
            _context6.next = 4;
            return _asset2.default.forge(data).save(null, { transacting: trx });

          case 4:
            asset = _context6.sent;
            _context6.next = 7;
            return _getNormalizedData(asset, meta.file_data);

          case 7:
            normalizedData = _context6.sent;
            _context6.next = 10;
            return _saveFile(normalizedData, 'assets/' + asset.get('id') + '/' + asset.get('file_name'), asset.get('content_type'));

          case 10:
            if (asset.get('is_image')) {
              _context6.next = 16;
              break;
            }

            _context6.next = 13;
            return _getPreviewData(asset, normalizedData, 'jpg');

          case 13:
            previewData = _context6.sent;
            _context6.next = 16;
            return _saveFile(previewData, 'assets/' + asset.get('id') + '/preview.jpg', 'image/jpeg');

          case 16:
            _context6.next = 18;
            return asset.save({ status_id: 3 }, { transacting: trx });

          case 18:
            return _context6.abrupt('return', asset);

          case 19:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function createAsset(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteAsset = exports.deleteAsset = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(asset, trx) {
    var files;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            files = ['assets/' + asset.get('id') + '/' + asset.get('file_name')];


            if (asset.get('has_preview')) files.push('assets/' + asset.get('id') + '/preview.jpg');

            _context7.next = 4;
            return _deleteFiles(files);

          case 4:
            _context7.next = 6;
            return asset.destroy({ transacting: trx });

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function deleteAsset(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var _getFilesize = function _getFilesize(fileData) {

  var random = _lodash2.default.random(100000000, 999999999).toString(36);

  var filePath = _path2.default.join('tmp', random);

  _fs2.default.writeFileSync(filePath, fileData);

  var fileStats = _fs2.default.statSync(filePath);

  _fs2.default.unlinkSync(filePath);

  return fileStats.size;
};

var _getNormalizedFileName = exports._getNormalizedFileName = function _getNormalizedFileName(filename) {

  var matches = filename.toLowerCase().match(/^(.*)\.([^?]*)\??(.*)$/);

  var basename = matches ? matches[1] : filename.toLowerCase();

  var extension = matches ? matches[2] : null;

  var rewritten = basename.replace(/[^0-9a-zA-Z-\s\_\.]/img, '').replace(/[\W\_]/img, '-').replace(/-{2,}/g, '-');

  return rewritten + (extension ? '.' + extension : '');
};

var _chunkExists = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(filepath) {
    var chunks;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _listChunks();

          case 2:
            chunks = _context8.sent;
            return _context8.abrupt('return', _lodash2.default.includes(chunks, filepath));

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function _chunkExists(_x15) {
    return _ref8.apply(this, arguments);
  };
}();

var _getAsset = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(asset) {
    var Key, _s, file;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            Key = 'assets/' + asset.get('id') + '/' + asset.get('file_name');

            if (!(process.env.ASSET_STORAGE === 's3')) {
              _context9.next = 9;
              break;
            }

            _s = _getS3();
            _context9.next = 5;
            return _s.getObject({
              Bucket: process.env.AWS_BUCKET,
              Key: Key
            }).promise();

          case 5:
            file = _context9.sent;
            return _context9.abrupt('return', file.Body);

          case 9:
            if (!(process.env.ASSET_STORAGE === 'local')) {
              _context9.next = 11;
              break;
            }

            return _context9.abrupt('return', _fs2.default.readFileSync(_path2.default.join('public', Key)));

          case 11:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function _getAsset(_x16) {
    return _ref9.apply(this, arguments);
  };
}();

var _getChunks = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(asset) {
    var totalChunks, chunkArray, chunks;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            totalChunks = parseInt(asset.get('chunks_total'));
            chunkArray = [].concat(_toConsumableArray(Array(parseInt(totalChunks))));
            _context11.next = 4;
            return Promise.mapSeries(chunkArray, function () {
              var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(item, index) {
                var Key, _s2, chunk;

                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        Key = 'tmp/' + asset.get('identifier') + '.' + (index + 1);

                        if (!(process.env.ASSET_STORAGE === 's3')) {
                          _context10.next = 9;
                          break;
                        }

                        _s2 = _getS3();
                        _context10.next = 5;
                        return _s2.getObject({
                          Bucket: process.env.AWS_BUCKET,
                          Key: Key
                        }).promise();

                      case 5:
                        chunk = _context10.sent;
                        return _context10.abrupt('return', chunk.Body);

                      case 9:
                        if (!(process.env.ASSET_STORAGE === 'local')) {
                          _context10.next = 11;
                          break;
                        }

                        return _context10.abrupt('return', _fs2.default.readFileSync(_path2.default.join('public', Key)));

                      case 11:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, _callee10, undefined);
              }));

              return function (_x18, _x19) {
                return _ref11.apply(this, arguments);
              };
            }());

          case 4:
            chunks = _context11.sent;
            return _context11.abrupt('return', chunks);

          case 6:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function _getChunks(_x17) {
    return _ref10.apply(this, arguments);
  };
}();

var _listChunks = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var _s3, parts;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            if (!(process.env.ASSET_STORAGE === 's3')) {
              _context12.next = 8;
              break;
            }

            _s3 = _getS3();
            _context12.next = 4;
            return _s3.listObjects({
              Bucket: process.env.AWS_BUCKET,
              Prefix: 'tmp'
            }).promise();

          case 4:
            parts = _context12.sent;
            return _context12.abrupt('return', parts.Contents.map(function (file) {
              return file.Key;
            }));

          case 8:
            if (!(process.env.ASSET_STORAGE === 'local')) {
              _context12.next = 10;
              break;
            }

            return _context12.abrupt('return', _fs2.default.readdirSync(_path2.default.join('public', 'tmp')).map(function (file) {
              return 'tmp/' + file;
            }));

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function _listChunks() {
    return _ref12.apply(this, arguments);
  };
}();

var _saveFile = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(filedata, filepath, content_type) {
    var _s4, assetpath, assetname;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (!(process.env.ASSET_STORAGE === 's3')) {
              _context13.next = 6;
              break;
            }

            _s4 = _getS3();
            _context13.next = 4;
            return _s4.upload({
              ACL: 'public-read',
              Body: filedata,
              Bucket: process.env.AWS_BUCKET,
              ContentType: content_type,
              Key: filepath
            }).promise();

          case 4:
            _context13.next = 7;
            break;

          case 6:
            if (process.env.ASSET_STORAGE === 'local') {
              assetpath = _path2.default.join.apply(_path2.default, ['public'].concat(_toConsumableArray(filepath.split('/').slice(0, -1))));
              assetname = filepath.split('/').pop();


              _mkdirp2.default.sync(assetpath);

              _fs2.default.writeFileSync(_path2.default.join(assetpath, assetname), filedata);
            }

          case 7:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function _saveFile(_x20, _x21, _x22) {
    return _ref13.apply(this, arguments);
  };
}();

var _deleteFiles = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(files) {
    var _s5;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!(process.env.ASSET_STORAGE === 's3')) {
              _context14.next = 6;
              break;
            }

            _s5 = _getS3();
            _context14.next = 4;
            return _s5.deleteObjects({
              Bucket: process.env.AWS_BUCKET,
              Delete: {
                Objects: files.map(function (Key) {
                  return { Key: Key };
                })
              }
            }).promise();

          case 4:
            _context14.next = 7;
            break;

          case 6:
            if (process.env.ASSET_STORAGE === 'local') {

              files.map(function (Key) {

                _fs2.default.unlinkSync(_path2.default.join('public', Key));
              });
            }

          case 7:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function _deleteFiles(_x23) {
    return _ref14.apply(this, arguments);
  };
}();

var _deleteChunks = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(asset) {
    var totalChunks, chunkArray, filepaths;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            totalChunks = parseInt(asset.get('chunks_total'));
            chunkArray = [].concat(_toConsumableArray(Array(parseInt(totalChunks))));
            filepaths = chunkArray.map(function (i, index) {

              return _getChunkFilename(asset.get('identifier'), index + 1);
            });

            if (!(process.env.ASSET_STORAGE === 's3')) {
              _context15.next = 8;
              break;
            }

            _context15.next = 6;
            return s3.deleteObjects({
              Bucket: process.env.AWS_BUCKET,
              Delete: {
                Objects: filepaths.map(function (Key) {
                  return { Key: Key };
                })
              }
            }).promise();

          case 6:
            _context15.next = 9;
            break;

          case 8:
            if (process.env.ASSET_STORAGE === 'local') {

              Promise.mapSeries(filepaths, function (filepath, index) {

                _fs2.default.unlinkSync(_path2.default.join('public', filepath));
              });
            }

          case 9:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function _deleteChunks(_x24) {
    return _ref15.apply(this, arguments);
  };
}();

var _getAssembledData = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(asset) {
    var chunks;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _getChunks(asset);

          case 2:
            chunks = _context16.sent;
            return _context16.abrupt('return', Buffer.concat(chunks));

          case 4:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function _getAssembledData(_x25) {
    return _ref16.apply(this, arguments);
  };
}();

var _getNormalizedData = function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(asset, fileData) {
    var content_type, isImage;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            content_type = asset.get('content_type');
            isImage = content_type.match(/image/) && content_type !== 'image/gif';

            if (!isImage) {
              _context17.next = 8;
              break;
            }

            _context17.next = 5;
            return _rotateImage(fileData);

          case 5:
            _context17.t0 = _context17.sent;
            _context17.next = 9;
            break;

          case 8:
            _context17.t0 = fileData;

          case 9:
            return _context17.abrupt('return', _context17.t0);

          case 10:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function _getNormalizedData(_x26, _x27) {
    return _ref17.apply(this, arguments);
  };
}();

var _getPreviewData = function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(asset, fileData, ext) {
    var pdfData, email, emailData;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            if (!(asset.get('extension') === 'xlsx')) {
              _context18.next = 7;
              break;
            }

            _context18.next = 3;
            return _convertOfficeFormat(fileData, 'pdf');

          case 3:
            pdfData = _context18.sent;
            _context18.next = 6;
            return _convertOfficeFormat(pdfData, 'jpg');

          case 6:
            return _context18.abrupt('return', _context18.sent);

          case 7:
            if (!(asset.get('content_type') === 'message/rfc822')) {
              _context18.next = 13;
              break;
            }

            _context18.next = 10;
            return simpleParser(fileData);

          case 10:
            email = _context18.sent;
            emailData = email.html || email.textAsHtml;
            return _context18.abrupt('return', _convertHtml(emailData));

          case 13:
            if (!(asset.get('content_type') === 'text/html')) {
              _context18.next = 15;
              break;
            }

            return _context18.abrupt('return', _convertHtml(fileData));

          case 15:
            _context18.next = 17;
            return _convertOfficeFormat(fileData, 'jpg');

          case 17:
            return _context18.abrupt('return', _context18.sent);

          case 18:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function _getPreviewData(_x28, _x29, _x30) {
    return _ref18.apply(this, arguments);
  };
}();

var _convertOfficeFormat = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(filedata, format) {
    var random, outDir, filePath, previewPath, previewData;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            random = _lodash2.default.random(100000000, 999999999).toString(36);
            outDir = _path2.default.join('.', 'tmp');
            filePath = _path2.default.join(outDir, random);
            previewPath = _path2.default.join(outDir, random + '.preview.' + format);


            _fs2.default.writeFileSync(filePath, filedata);

            _context19.next = 7;
            return execAsync('soffice --convert-to preview.' + format + ' --outdir ' + outDir + ' ' + filePath);

          case 7:
            previewData = new Buffer(_fs2.default.readFileSync(previewPath), 'binary');


            _fs2.default.unlinkSync(filePath);

            _fs2.default.unlinkSync(previewPath);

            return _context19.abrupt('return', previewData);

          case 11:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  }));

  return function _convertOfficeFormat(_x31, _x32) {
    return _ref19.apply(this, arguments);
  };
}();

var _convertHtml = function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(html) {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return new Promise(function (resolve, reject) {

              var options = {
                siteType: 'html',
                streamType: 'jpg',
                defaultWhiteBackground: true,
                shotSize: {
                  width: 'window',
                  height: 'all'
                }
              };

              var ws = (0, _webshot2.default)(html, options);

              var buffer = [];

              ws.on('data', function (data) {
                return buffer.push(data);
              });

              ws.on('error', function (err) {
                return reject(new Error(err));
              });

              ws.on('end', function () {
                return resolve(Buffer.concat(buffer));
              });
            });

          case 2:
            return _context20.abrupt('return', _context20.sent);

          case 3:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  }));

  return function _convertHtml(_x33) {
    return _ref20.apply(this, arguments);
  };
}();

var _unlinkChunk = function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(filepath) {
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:

            _fs2.default.unlinkSync(filepath);

          case 1:
          case 'end':
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  }));

  return function _unlinkChunk(_x34) {
    return _ref21.apply(this, arguments);
  };
}();

var _rotateImage = function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(data) {
    var image;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return _jimp2.default.read(data);

          case 2:
            image = _context22.sent;

            if (image) {
              _context22.next = 5;
              break;
            }

            return _context22.abrupt('return', data);

          case 5:

            image.exifRotate();

            _context22.next = 8;
            return new Promise(function (resolve, reject) {

              image.getBuffer(image.getMIME(), function (err, buffer) {

                if (err) reject(new Error(err));

                resolve(buffer);
              });
            });

          case 8:
            return _context22.abrupt('return', _context22.sent);

          case 9:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, undefined);
  }));

  return function _rotateImage(_x35) {
    return _ref22.apply(this, arguments);
  };
}();

var s3 = null;

var _getS3 = function _getS3() {

  if (s3) return s3;

  s3 = new _aws2.default.S3();

  return s3;
};

var _cleanIdentifier = function _cleanIdentifier(identifier) {
  return identifier.replace(/^0-9A-Za-z_-/img, '');
};

var _getChunkFilename = function _getChunkFilename(identifier, chunkNumber) {
  return _path2.default.join('.', 'tmp', _cleanIdentifier(identifier) + '.' + chunkNumber);
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(simpleParser, 'simpleParser', 'unknown');
  reactHotLoader.register(execAsync, 'execAsync', 'unknown');
  reactHotLoader.register(validateRequest, 'validateRequest', 'unknown');
  reactHotLoader.register(checkUploadedFile, 'checkUploadedFile', 'unknown');
  reactHotLoader.register(uploadChunk, 'uploadChunk', 'unknown');
  reactHotLoader.register(assembleAsset, 'assembleAsset', 'unknown');
  reactHotLoader.register(processAsset, 'processAsset', 'unknown');
  reactHotLoader.register(getAsset, 'getAsset', 'unknown');
  reactHotLoader.register(createAsset, 'createAsset', 'unknown');
  reactHotLoader.register(deleteAsset, 'deleteAsset', 'unknown');
  reactHotLoader.register(_getFilesize, '_getFilesize', 'unknown');
  reactHotLoader.register(_getNormalizedFileName, '_getNormalizedFileName', 'unknown');
  reactHotLoader.register(_chunkExists, '_chunkExists', 'unknown');
  reactHotLoader.register(_getAsset, '_getAsset', 'unknown');
  reactHotLoader.register(_getChunks, '_getChunks', 'unknown');
  reactHotLoader.register(_listChunks, '_listChunks', 'unknown');
  reactHotLoader.register(_saveFile, '_saveFile', 'unknown');
  reactHotLoader.register(_deleteFiles, '_deleteFiles', 'unknown');
  reactHotLoader.register(_deleteChunks, '_deleteChunks', 'unknown');
  reactHotLoader.register(_getAssembledData, '_getAssembledData', 'unknown');
  reactHotLoader.register(_getNormalizedData, '_getNormalizedData', 'unknown');
  reactHotLoader.register(_getPreviewData, '_getPreviewData', 'unknown');
  reactHotLoader.register(_convertOfficeFormat, '_convertOfficeFormat', 'unknown');
  reactHotLoader.register(_convertHtml, '_convertHtml', 'unknown');
  reactHotLoader.register(_unlinkChunk, '_unlinkChunk', 'unknown');
  reactHotLoader.register(_rotateImage, '_rotateImage', 'unknown');
  reactHotLoader.register(s3, 's3', 'unknown');
  reactHotLoader.register(_getS3, '_getS3', 'unknown');
  reactHotLoader.register(_cleanIdentifier, '_cleanIdentifier', 'unknown');
  reactHotLoader.register(_getChunkFilename, '_getChunkFilename', 'unknown');
  leaveModule(module);
})();

;