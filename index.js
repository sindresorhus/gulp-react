'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var react = require('react-tools');

module.exports = function (name) {
	return es.map(function (file, cb) {
		if (file.isNull()) {
			return cb(null, file);
		}

		var contents;

		try {
			contents = react.transform(file.contents.toString());
		} catch (err) {
			return cb(new Error('gulp-react: ' + err));
		}

		file.contents = new Buffer(contents);
		file.path = gutil.replaceExtension(file.path, '.js');
		cb(null, file);
	});
};
