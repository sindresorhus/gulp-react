'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var react = require('./index');
var JS_COMMENTS_REGEX = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm;

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

it('should ensure JSX directive is the first comment on the file if file has .jsx extension', function (cb) {
	var stream = react();

	stream.on('data', function (file) {
		var fileContentsString = file.contents.toString();
		var commentMatches = fileContentsString.match(JS_COMMENTS_REGEX);

		assert.equal(file.relative, 'fixture.js');
		assert(/\/\*\*/.test(commentMatches[0]));
		assert(/@jsx/.test(commentMatches[0]));
		assert(/\/\*\* JSX directive must precede this comment \*\//.test(commentMatches[1]));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer('/** JSX directive must precede this comment */ \n\n var HelloMessage = React.createClass({render: function(){return <div>Hello {this.props.name}</div>;}});')
	}));
});

it('should not duplicate JSX directive if file has .jsx extension', function (cb) {
	var stream = react();

	stream.on('data', function (file) {
		var fileContentsString = file.contents.toString();
		var commentMatches = fileContentsString.match(JS_COMMENTS_REGEX);

		assert.equal(file.relative, 'fixture.js');
		assert(/\/\*\*/.test(commentMatches[0]));
		assert(/@jsx/.test(commentMatches[0]));
		assert(/\/\* This is a comment \*\//.test(commentMatches[1]));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer('/**\n* @jsx React.DOM \n\n */ \n\n /* This is a comment */\n\n var HelloMessage = React.createClass({render: function(){return <div>Hello {this.props.name}</div>;}});')
	}));
});
