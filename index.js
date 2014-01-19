'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var react = require('react-tools');

module.exports = function (name) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-react', 'Streaming not supported'));
			return cb();
		}

		try {
			file.contents = new Buffer(react.transform(file.contents.toString()));
			file.path = gutil.replaceExtension(file.path, '.js');
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-react', err));
		}

		this.push(file);
		cb();
	});
};
