'use strict';

const fs = require('fs');

fs.readFile( 'day1.txt', ( err, data ) => {
	if ( err ) {
		return console.error( err ); // eslint-disable-line no-console
	}

	const dirs = data.toString().split(', ').map( dir => ({ dir: dir.substring(0,1), mag: +dir.substring(1) }) );

	// idx of current direction
	let currentDir = 0;

	let pos = [0, 0];

	dirs.forEach( ( dir ) => {
		currentDir = ( dir.dir === 'L' ) ? (currentDir + 3) % 4 : (currentDir + 1) % 4;

		switch (currentDir) {
		case 0:
			pos[1] = pos[1] + dir.mag;
			break;
		case 1:
			pos[0] = pos[0] + dir.mag;
			break;
		case 2:
			pos[1] = pos[1] - dir.mag;
			break;
		case 3:
			pos[0] = pos[0] - dir.mag;
			break;
		}

	});

	// Answer 1
	console.log( 'Answer 1 - ', pos, pos[0] + pos[1]); // eslint-disable-line no-console

});

fs.readFile( 'day1.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	let answer2;
	const updatePositions = ( idx, positive, mag ) => {
		if ( answer2 !== undefined ) { return; }
		let i = 1;
		while ( i <= mag ) {
			let newPos = pos.slice();
			newPos[idx] = ( positive ) ? newPos[idx] + i : newPos[idx] - i;
			if ( positions.indexOf( newPos.join(',') ) !== -1 ) { answer2 = newPos; }
			positions.push( newPos.join(',') );
			i++;
		}
	};

	const dirs = data.toString().split(', ').map( dir => ({ dir: dir.substring(0,1), mag: +dir.substring(1) }) );

	// idx of current direction
	let currentDir = 0;

	let pos = [0, 0];

	// all (integer) positions
	let positions = [ '0,0' ];

	dirs.forEach( ( dir ) => {

		currentDir = ( dir.dir === 'L' ) ? (currentDir + 3) % 4 : (currentDir + 1) % 4;

		switch (currentDir) {
		case 0:
			updatePositions( 1, true, dir.mag );
			pos[1] = pos[1] + dir.mag;
			break;
		case 1:
			updatePositions( 0, true, dir.mag );
			pos[0] = pos[0] + dir.mag;
			break;
		case 2:
			updatePositions( 1, false, dir.mag );
			pos[1] = pos[1] - dir.mag;
			break;
		case 3:
			updatePositions( 0, false, dir.mag );
			pos[0] = pos[0] - dir.mag;
			break;
		}
	});

	console.log( 'Answer 2 - ', answer2, answer2[0] + answer2[1] ); // eslint-disable-line no-console
});
