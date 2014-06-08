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

it('should prepend correct JSX directive if file has .jsx extension and top-of-page comment is not JSX directive', function (cb) {
	// Some code-editors may insert automatic comments which are required to be preserved
	var stream = react();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture.js');
		assert(/@jsx/.test(file.contents.toString()));
		assert(/ this comment must exist/.test(file.contents.toString()));
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer('/**\n Hey myy organization says \n this comment must exist on all files \n\n */var HelloMessage = React.createClass({render: function(){return <div>Hello {this.props.name}</div>;}});')
	}));
});

it('should contain only one correct JSX directive at top of the file if file has .jsx extension', function (cb) {
	var stream = react();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'fixture.js');
		var fileContentsString = file.contents.toString(),
			JS_COMMENTS_REGEX = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm,
			commentMatches = fileContentsString.match(JS_COMMENTS_REGEX),
			directiveMatchCount = 0;
		commentMatches.forEach(function(match){
			/@jsx/.test(match) ? directiveMatchCount++ : directiveMatchCount = directiveMatchCount;
		});
		assert(directiveMatchCount === 1);
		cb();
	});

	stream.write(new gutil.File({
		path: 'fixture.jsx',
		contents: new Buffer('/**\n @jsx\n React.DOM \n\n */var HelloMessage = React.createClass({render: function(){return <div>Hello {this.props.name}</div>;}});')
	}));
});
