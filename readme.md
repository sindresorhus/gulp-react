# [gulp](http://gulpjs.com)-react [![Build Status](https://secure.travis-ci.org/sindresorhus/gulp-react.png?branch=master)](http://travis-ci.org/sindresorhus/gulp-react)

> Precompile [Facebook React](http://facebook.github.io/react/) JSX templates into JavaScript

*Issues with the output should be reported on the React [issue tracker](https://github.com/facebook/react/issues).*


## Install

```
npm install --save-dev gulp-react
```


## Example

```js
var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('default', function () {
	gulp.src('template.jsx')
		.pipe(react())
		.pipe(gulp.dest('dist'));
});
```

The JSX directive `/** @jsx React.DOM */` is automagically prepended to `.jsx` files if missing.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
