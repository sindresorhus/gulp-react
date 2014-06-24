'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var react = require('react-tools');

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-react', 'Streaming not supported'));
			return cb();
		}

		var str = file.contents.toString();
		var filePath = file.path;
		// http://stackoverflow.com/a/15123777
		var JS_COMMENTS_REGEX = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm;
		var commentMatches = str.match(JS_COMMENTS_REGEX);
		var hasJsxComment = commentMatches && (commentMatches[0].indexOf('/**') !== -1 && commentMatches[0].indexOf('@jsx') !== -1);

		if (path.extname(filePath) === '.jsx' && !hasJsxComment) {
			str = '/** @jsx React.DOM */\n' + str;
		}

		try {
			file.contents = new Buffer(react.transform(str, options));
			file.path = gutil.replaceExtension(filePath, '.js');
			this.push(file);
		} catch (err) {
			err.fileName = err.fileName || filePath;
			this.emit('error', new gutil.PluginError('gulp-react', err, {
				fileName: filePath
			}));
		}

		cb();
	});
};
