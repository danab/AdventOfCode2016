'use strict';

const fs = require('fs');

const createCheckSum = ( name ) => {
	const chars = name.split('');
	const freqs = chars.reduce( ( currentMap, nextChar ) => {

		// ignore dashes
		if ( nextChar === '-' ) { return currentMap; }

		if ( currentMap[ nextChar ] ) {
			currentMap[ nextChar ] = currentMap[ nextChar ] + 1;
		} else {
			currentMap[ nextChar ] = 1;
		}

		return currentMap;
	}, {} );

	const keys = Object.keys( freqs );
	const orderedFreq = keys.sort( (a, b) => {
		// If different, sort by frequency
		if ( freqs[a] !== freqs[b] ) { return freqs[b] - freqs[a]; }

		// If the same, sort alphabetically
		return ( a > b ) ? 1 : -1;
	});

	return orderedFreq.join('').slice( 0, 5 );
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const decryptName = ( name, shift ) => {
	shift = shift % 26;

	name = name.split('')
		.map( char => {
			if ( char === '-' ) { return ' '; }

			// I'm sure you could speed this up by storing these values in memory
			const idx = alphabet.indexOf( char );
			return alphabet[ ( idx + shift ) % 26 ];
		})
		.join('');

	return name;
};

fs.readFile( 'day04.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	const rooms = data .toString().split('\n')
		.map( (room) => {
			// I'm no good at regex
			let name = room.split('-');
			let extra = name.pop();
			extra = extra.split('[');
			name = name.join('-');
			return {
				name,
				number: +extra[0],
				checksum: extra[1].slice( 0, -1 )
			};
		});

	const realRooms = rooms
		.filter( room => createCheckSum( room.name ) === room.checksum );

	// Sum up the real room numbers
	const answer1 = realRooms
		.reduce( (currentVal, nextRoom) => currentVal + nextRoom.number, 0);

	console.log( 'Answer 1 - ', answer1 ); // eslint-disable-line no-console

	const answer2 = realRooms.map( room => {
		const decryptedName = decryptName( room.name, room.number );
		return Object.assign( {}, room, { decryptedName } );
	})
		.find( room => { return room.decryptedName.indexOf('north') !== -1; } );

	console.log( 'Answer 2 - ', answer2.number ); // eslint-disable-line no-console
});
