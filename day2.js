'use strict';

const fs = require('fs');

fs.readFile( 'day2.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	let lines = data.toString().split('\n');
	let pos = 5;

	let validMovesPart1 = {
		U: {
			4: 1,
			5: 2,
			6: 3,
			7: 4,
			8: 5,
			9: 6
		},
		R: {
			1: 2,
			2: 3,
			4: 5,
			5: 6,
			7: 8,
			8: 9
		},
		D: {
			1: 4,
			2: 5,
			3: 6,
			4: 7,
			5: 8,
			6: 9
		},
		L: {
			2: 1,
			3: 2,
			5: 4,
			6: 5,
			8: 7,
			9: 8
		}
	};

	let validMovesPart2 = {
		U: {
			3: 1,
			6: 2,
			7: 3,
			8: 4,
			A: 6,
			B: 7,
			C: 8,
			D: 'B'
		},
		R: {
			2: 3,
			3: 4,
			5: 6,
			6: 7,
			7: 8,
			8: 9,
			A: 'B',
			B: 'C'

		},
		D: {
			1: 3,
			2: 6,
			3: 7,
			4: 8,
			6: 'A',
			7: 'B',
			8: 'C',
			B: 'D'
		},
		L: {
			3: 2,
			4: 3,
			6: 5,
			7: 6,
			8: 7,
			9: 8,
			B: 'A',
			C: 'B',
		}
	};
	let code1 = '';
	lines.forEach( ( line ) => {
		line.split('').forEach( ( dir ) => {
			if ( validMovesPart1[ dir ][ pos ] ) {
				pos = validMovesPart1[ dir ][ pos ];
			}
		});

		code1 += pos;
	});

	pos = 5;
	let code2 = '';
	lines.forEach( ( line ) => {
		line.split('').forEach( ( dir ) => {
			if ( validMovesPart2[ dir ][ pos ] ) {
				pos = validMovesPart2[ dir ][ pos ];
			}
		});

		code2 += pos;
	});


	console.log( 'Answer 1 - ', code1 ); // eslint-disable-line no-console
	console.log( 'Answer 2 - ', code2 ); // eslint-disable-line no-console
});
