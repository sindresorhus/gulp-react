# [gulp](http://gulpjs.com)-react [![Build Status](https://travis-ci.org/sindresorhus/gulp-react.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-react)

> Precompile [Facebook React](http://facebook.github.io/react/) JSX templates into JavaScript

*Issues with the output should be reported on the React [issue tracker](https://github.com/facebook/react/issues).*


## Install

```bash
$ npm install --save-dev gulp-react
```


## Usage

```js
var gulp = require('gulp');
var react = require('gulp-react');
var gutil = require('gulp-util');

gulp.task('default', function () {
	return gulp.src('template.jsx')
		.pipe(react())
		.on('error', function(err) {
			gutil.log(gutil.colors.red(err.fileName + ': ' + err.message));
		})
		.pipe(gulp.dest('dist'));
});
```

The JSX directive `/** @jsx React.DOM */` is automagically prepended to `.jsx` files if missing.


## API

### react(options)

#### options.harmony

Type: `boolean`  
Default: `false`

Enable [harmony features for JSX](https://github.com/facebook/jstransform/tree/master/visitors).


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
