'use strict';

// MODULES //

var isBuffer = require( 'validate.io-buffer' ),
	toStr = require( './serialize.js' );


// SERIALIZE //

/**
* FUNCTION: serialize( value )
*	Serializes a Buffer object for dynamic code evaluation.
*
* @param {Buffer} value - Buffer object
* @returns {String} serialized value
*/
function serialize( value ) {
	if ( !isBuffer( value ) ) {
		throw new TypeError( 'invalid input value. Must provide a Buffer object. Value: `' + value + '`.' );
	}
	return toStr( value );
} // end FUNCTION serialize()


// EXPORTS //

module.exports = serialize;
module.exports.raw = toStr;
