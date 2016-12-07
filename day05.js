'use strict';

const crypto = require('crypto');

const input = 'uqwqemis';
let passwordA = '';
let passwordB = [];
let digitsFound = 0;
let int = 0;

const start = new Date();
while ( digitsFound < 8 ) {
	const hash = crypto.createHash('md5').update( input + int ).digest('hex');

	if ( hash.slice( 0, 5 ) === '00000' ) {
		const chars = hash.split('');
		if ( passwordA.length < 8 ) {
			passwordA += chars[5];
		}
		const pos = +chars[5];
		const val = chars[6];

		if ( !isNaN( pos ) && pos < 8 && passwordB[ pos ] === undefined ) {
			passwordB[ pos ] = val;
			digitsFound += 1;
		}
	}

	int += 1;
}
const end = new Date();
console.log( 'Answer 1 - ', passwordA ); // eslint-disable-line no-console
console.log( 'Answer 2 - ', passwordB.join('') ); // eslint-disable-line no-console
// ~50 seconds on a 2015 MBP. Don't see super obvious ways of speeding up
console.log( `Took ${(end-start)/1000} seconds.` ); // eslint-disable-line no-console
