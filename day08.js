'use strict';

const fs = require('fs');
fs.readFile( 'day08.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	const instructions = data.toString().split('\n');

	let board = createBoard( 50, 6 );

	board = instructions.reduce( ( board, instruct ) => {
		const words = instruct.split(' ');

		if ( words[0] === 'rect' ) {
			const dims = words[1].split('x');
			return rect( board, dims[0], dims[1] );
		} else if ( words[1] === 'column' ) {
			const newBoard = rotateCol( board, +words[2].split('=')[1], +words[4]);
			return newBoard;
		} else {
			const newBoard = rotateRow( board, +words[2].split('=')[1], +words[4]);
			return newBoard;
		}
	}, board );

	const lights = board.reduce( ( total, row ) => {
		return total + row.reduce( (sum, light) => {
			if ( light === '#' ) {
				return sum + 1;
			} else {
				return sum;
			}
		}, 0 );
	}, 0);
	console.log( 'Answer 1 - ', lights ); // eslint-disable-line no-console

	console.log( 'Answer 2 - ' ); // eslint-disable-line no-console
	board.forEach( ( row ) => {
		console.log( row.join('') ); // eslint-disable-line no-console
	});
});

const createBoard = ( wide, tall ) => {
	let board = [];
	for ( var i = 0; i < tall; i++ ) {
		board.push([]);
		for( var j = 0; j < wide; j++ ) {
			board[i].push( ' ' );
		}
	}

	return board;
};

const rect = ( board, wide, tall ) => {
	for ( var i = 0; i < tall; i++ ) {
		for( var j = 0; j < wide; j++ ) {
			board[i][j] = '#';
		}
	}

	return board;
};

const rotateCol = ( board, col, mag ) => {
	const currentCol = board.map( (row) => row[col] );

	const len = board.length;
	return board.map( (row, i) => {
		row[col] = currentCol[ (i - mag + len) % len ];
		return row;
	});
};

const rotateRow = ( board, row, mag ) => {
	const len = board[row].length;
	const newRow = board[row].map( ( light, i ) => {
		return board[row][(i - mag + len) % len ];
	});

	board[row] = newRow;
	return board;
};
