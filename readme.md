# [gulp](http://gulpjs.com)-react [![Build Status](https://travis-ci.org/sindresorhus/gulp-react.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-react)

> Precompile [Facebook React](http://facebook.github.io/react/) JSX templates into JavaScript

*Issues with the output should be reported on the React [issue tracker](https://github.com/facebook/react/issues).*


## Install

```sh
$ npm install --save-dev gulp-react
```


## Usage

```js
var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('default', function () {
	return gulp.src('template.jsx')
		.pipe(react())
		.pipe(gulp.dest('dist'));
});
```

The JSX directive `/** @jsx React.DOM */` is automagically prepended to `.jsx` files if missing.


## API

All options are passed to react-tools' `transform` method. Refer to the [react-tools API](https://github.com/facebook/react/tree/master/npm-react-tools#transforminputstring-options) for a complete list of options.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
