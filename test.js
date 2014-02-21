'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var react = require('./index');
var fakeFile = 'var HelloMessage = React.createClass({render: function(){return <div>Hello {this.props.name}</div>;}});';

it('should precompile React templates', function (cb) {
	var stream = react();
	var fakeFileWithPragma = '/** @jsx React.DOM */' + fakeFile;

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture.js');
		assert(/"Hello "/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer(fakeFileWithPragma)
	}));
});

it('should add pragma to React templates given addPragma option', function (cb) {
	var stream = react({ addPragma: true });

	stream.on('data', function (file) {
		assert(/\/\*\* @jsx React\.DOM \*\//i.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer(fakeFile)
	}));
});
