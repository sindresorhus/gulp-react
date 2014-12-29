# gulp-react [![Build Status](https://travis-ci.org/sindresorhus/gulp-react.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-react)

> Precompile [React](http://facebook.github.io/react/) JSX templates into JavaScript and change file extname to .js

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
		.pipe(react({harmony: true}))
		.pipe(gulp.dest('dist'));
});
```


## API

### react(options)

* `options.keepExt`: do not change file extname to .js

Options are passed to react-tools' [`transform` method](https://github.com/facebook/react/tree/master/npm-react-tools#transforminputstring-options).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
