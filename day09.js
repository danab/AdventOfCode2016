const fs = require('fs');

fs.readFile( 'day09.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	const start = new Date();
	const str = data.toString();

	console.log( 'Answer 1 - ', decompress( str, false ) ); // eslint-disable-line no-console
	console.log( 'Answer 2 - ', decompress( str, true ) ); // eslint-disable-line no-console

	const end = new Date();
	// Took ~200 seconds on a 2015 MBP, probably lots of room for improvement
	console.log( `Took ${(end-start)/1000} seconds.` ); // eslint-disable-line no-console
});

const decompress = ( str, part2 ) => {
	const idx = str.indexOf( '(' );

	if ( idx === -1 ) {
		return str.length;
	}

	const firstPart = str.substring( 0, idx );

	const secondIdx = str.indexOf( ')' );

	const instructs = str
		.substring( idx + 1, secondIdx )
		.split('x')
		// make sure it's an integer
		.map( x => +x );

	const repeatyPart = str.substring( secondIdx + 1, secondIdx + 1 + instructs[0] );

	const secondPart = ( part2 ) ? decompress( repeatyPart.repeat( instructs[1] ), part2 ) : repeatyPart.repeat( instructs[1] ).length;

	const rest = str.substring( secondIdx + 1 + instructs[0] );

	return firstPart.length + secondPart + decompress( rest, part2 );
};

