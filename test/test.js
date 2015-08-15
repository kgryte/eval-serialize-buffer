/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	serialize = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'serialize', function tests() {

	it( 'should export a function', function test() {
		expect( serialize ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a Buffer object', function test() {
		var values = [
			'5',
			5,
			null,
			true,
			NaN,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				serialize( value );
			};
		}
	});

	it( 'should serialize a Buffer object', function test() {
		/* jshint evil:true */
		var out,
			b;

		b = new Buffer( 'beep' );
		out = serialize( b );

		assert.strictEqual( out, 'new Buffer("YmVlcA==","base64")' );
		assert.strictEqual( eval( out ).constructor.name, 'Buffer' );
		assert.deepEqual( b, eval( out ) );
	});

});
