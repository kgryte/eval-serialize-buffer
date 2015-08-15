'use strict';

/**
* FUNCTION: serialize( b )
*	Serializes a Buffer object for dynamic code evaluation.
*
* @param {Buffer} b - Buffer object
* @returns {String} serialized value
*/
function serialize( b ) {
	return 'new Buffer("'+( b.toString( 'base64' ) )+'","base64")';
} // end FUNCTION serialize()


// EXPORTS //

module.exports = serialize;
