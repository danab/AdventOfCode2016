'use strict';

const fs = require('fs');

const isValidTriangle = ( a, b, c ) => ( a + b > c ) && ( a + c > b ) && ( b + c > a );

fs.readFile( 'day03.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	let triangles = data
		.toString()
		.split('\n')
		.map( tri => {
			return tri.split(' ').filter( str => str.trim() !== '' ).map( str => +str.trim());
		});

	let valid1 = triangles.reduce( (valid, tri) => {
		return ( isValidTriangle( tri[0], tri[1], tri[2] ) ) ? valid + 1 : valid;
	}, 0);

	console.log( 'Answer 1 - ', valid1 ); // eslint-disable-line no-console

	let valid2 = 0;
	let i = 0;

	while ( i < triangles.length ) {
		if ( isValidTriangle( triangles[i][0], triangles[i+1][0], triangles[i+2][0] ) ) { valid2++; }
		if ( isValidTriangle( triangles[i][1], triangles[i+1][1], triangles[i+2][1] ) ) { valid2++; }
		if ( isValidTriangle( triangles[i][2], triangles[i+1][2], triangles[i+2][2] ) ) { valid2++; }
		i += 3;
	}

	console.log( 'Answer 2 - ', valid2 ); // eslint-disable-line no-console
});
