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

		if (path.extname(file.path) === '.jsx' && str.indexOf('/** @jsx') === -1) {
			str = '/** @jsx React.DOM */\n' + str;
		}

		try {
			file.contents = new Buffer(react.transform(str, options));
			file.path = gutil.replaceExtension(file.path, '.js');
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-react', err, {
				fileName: file.path
			}));
		}

		this.push(file);
		cb();
	});
};
