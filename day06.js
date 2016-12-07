'use strict';

const fs = require('fs');

const leastCharacter = ( freq ) => {
	let min = Number.MAX_SAFE_INTEGER;
	let char;
	Object.keys( freq ).forEach( key => {
		if ( freq[key] < min ) {
			min = freq[key];
			char = key;
		}
	});

	return char;
};

const topCharacter = ( freq ) => {
	let max = 0;
	let char;
	Object.keys( freq ).forEach( key => {
		if ( freq[key] > max ) {
			max = freq[key];
			char = key;
		}
	});

	return char;

};
fs.readFile( 'day06.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	const messages = data.toString().split('\n');

	const freqs = messages.reduce( ( freq, message ) => {
		message.split('').forEach( ( char, i ) => {
			freq[i][char] = ( freq[i][char] || 0 ) + 1;
		});

		return freq;
	}, [ {}, {}, {}, {}, {}, {}, {}, {} ]);

	const topFreqs = freqs.map( topCharacter );
	const leastFreqs = freqs.map( leastCharacter );
	
	console.log( 'Answer 1 - ', topFreqs.join('') ); // eslint-disable-line no-console
	console.log( 'Answer 2 - ', leastFreqs.join('') ); // eslint-disable-line no-console
});
