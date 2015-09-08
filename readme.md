# gulp-react [![Build Status](https://travis-ci.org/sindresorhus/gulp-react.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-react)

## Deprecated in favor of [gulp-babel](https://github.com/babel/gulp-babel). [Read more.](https://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html)

> Precompile [React](http://facebook.github.io/react/) JSX templates into JavaScript

*Issues with the output should be reported on the React [issue tracker](https://github.com/facebook/react/issues).*


## Install

```
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


## API

### react([options])

See the `react-tools` [options](https://github.com/facebook/react/tree/master/npm-react-tools#transforminputstring-options), except for `sourceMap` and `sourceFilename`, which are handled for you.


## Source Maps

Use [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) like this:

```js
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var react = require('gulp-react');

gulp.task('default', function () {
	return gulp.src('template.jsx')
		.pipe(sourcemaps.init())
		.pipe(react())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
