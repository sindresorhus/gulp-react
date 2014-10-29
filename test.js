'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var react = require('./');

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

it('should precompile React templates with --harmony flag', function (cb) {
	var stream = react({ harmony: true });

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture.harmony.js');
		assert(/function\(\)/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.harmony.jsx',
		contents: new Buffer('/** @jsx React.DOM */var HelloMessage = React.createClass({render: () => {return <div>Hello {this.props.name}</div>;}});')
	}));
});
