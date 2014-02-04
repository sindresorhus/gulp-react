'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var react = require('react-tools');

module.exports = function (opts) {
	if (!opts) opts = {};

	var pragma = '/** @jsx React.DOM */';
	var defaults = {
		addPragma: false
	};

	Object.keys(defaults).forEach(function(method) {
		if (!opts[method]) opts[method] = defaults[method];
	});

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
			var content = file.contents.toString();

			if (opts.addPragma && content.indexOf('@jsx React.DOM'))
				content = pragma + content;

			file.contents = new Buffer(react.transform(content));
			file.path = gutil.replaceExtension(file.path, '.js');
		} catch (err) {
			err.fileName = file.path;
			this.emit('error', new gutil.PluginError('gulp-react', err));
		}

		this.push(file);
		cb();
	});
};
