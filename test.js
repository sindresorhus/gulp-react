'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var react = require('./index');

it('should precompile React templates', function (cb) {
	var stream = react();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture.js');
		assert(/"Hello "/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer('/** @jsx React.DOM */var HelloMessage = React.createClass({render: function(){return <div>Hello {this.props.name}</div>;}});')
	}));
});

it('should add JSX directive if not found and file has .jsx extension', function (cb) {
	var stream = react();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture.js');
		assert(/@jsx/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer('var HelloMessage = React.createClass({render: function(){return <div>Hello {this.props.name}</div>;}});')
	}));
});
