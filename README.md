Buffer Serialization
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Serializes a [Buffer](https://nodejs.org/api/buffer.html) object for dynamic code evaluation.


## Installation

``` bash
$ npm install eval-serialize-buffer
```


## Usage

``` javascript
var serialize = require( 'eval-serialize-buffer' );
```

#### serialize( value )

Serializes a [`Buffer`](https://nodejs.org/api/buffer.html) object for dynamic code evaluation.

``` javascript
var deepEqual = require( 'deep-equal' );

var b1 = new Buffer( 'beep' );

var str = serialize( b1 );
// returns 'new Buffer("YmVlcA==","base64")'

var b2 = eval( str );
// returns Buffer( 'beep' )

var bool = deepEqual( b1, b2 );
// returns true
```


#### serialize.raw( buffer )

Serializes a [`Buffer`](https://nodejs.org/api/buffer.html) object without performing type checking.

``` javascript
try {
	// throws during input argument validation...
	serialize( null );
} catch ( err ) {
	console.error( err );
}

// To bypass validation...
var str = serialize.raw( new Buffer( 'boop' ) );
// returns 'new Buffer("Ym9vcA==","base64")';
```


## Examples

``` javascript
var serialize = require( 'eval-serialize-buffer' );

/**
* Returns a function to create a filled array.
*/
function create( arr ) {
	var f = '';
	f += 'return function fill( len ) {';
	f += 'var arr = new Array( len );';
	f += 'for ( var i = 0; i < len; i++ ) {';
	f += 'arr[ i ] = ' + serialize( arr ) + ';';
	f += '}';
	f += 'return arr;';
	f += '}';
	return ( new Function( f ) )();
}

var fill = create( new Buffer( 'beepboop' ) );

console.log( fill( 10 ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/eval-serialize-buffer.svg
[npm-url]: https://npmjs.org/package/eval-serialize-buffer

[travis-image]: http://img.shields.io/travis/kgryte/eval-serialize-buffer/master.svg
[travis-url]: https://travis-ci.org/kgryte/eval-serialize-buffer

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/eval-serialize-buffer/master.svg
[codecov-url]: https://codecov.io/github/kgryte/eval-serialize-buffer?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/eval-serialize-buffer.svg
[dependencies-url]: https://david-dm.org/kgryte/eval-serialize-buffer

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/eval-serialize-buffer.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/eval-serialize-buffer

[github-issues-image]: http://img.shields.io/github/issues/kgryte/eval-serialize-buffer.svg
[github-issues-url]: https://github.com/kgryte/eval-serialize-buffer/issues
