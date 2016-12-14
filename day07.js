'use strict';

const fs = require('fs');

const sum = ( count, isIt ) => {
	if ( isIt ) {
		return count + 1;
	} else {
		return count;
	}
};

// PUZZLE 1
const isAbba = ( str ) => {
	const chars = str.split('');
	return chars[0] !== chars[1] && chars[0] === chars[3] && chars[1] === chars[2];
};

const hasAbba = ( str ) => {
	let hasIt = false;
	for( var i = 0; i < str.length - 3; i++ ) {
		if ( isAbba( str.substring( i, i+4 ) ) ) {
			hasIt = true;
		}
	}

	return hasIt;
};

const isTLS = ( ipObj ) => {
	return !!(ipObj.seqs.filter( hasAbba ).length && !ipObj.hypernets.filter( hasAbba ).length);
};

// PUZZLE 2
const isABA = ( str ) => {
	const chars = str.split('');
	return chars[0] !== chars[1] && chars[0] === chars[2];
};

const getBAB = ( str ) => {
	const chars = str.split('');
	return chars[1] + chars[0] + chars[1];
};

// give it the whole array of sequences
const getABAs = ( seqArr ) => {
	let ABAs = [];

	seqArr.forEach( seq => {
		for( var i = 0; i < seq.length - 2; i++ ) {
			if ( isABA( seq.substring( i, i+3 ) ) ) {
				ABAs.push( seq.substring( i, i+3));
			}
		}
	});

	return ABAs;
};

const isSSL = (ipObj) => {
	const ABAs = getABAs( ipObj.seqs );

	const hypernets = ipObj.hypernets.join('--');

	let hasBAB = false;

	ABAs.forEach( (ABA) => {
		if ( hypernets.indexOf( getBAB( ABA ) ) !== -1 ) {
			hasBAB = true;
		}
	});

	return hasBAB;
};

fs.readFile( 'day07.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	const ips = data.toString().split('\n').map( ip => {
		let seqs = [];
		let hypernets = [];
		
		ip.split('[').forEach( ( seq, i ) => {
			// first is normal...
			if ( i === 0 ) { seqs.push( seq ); return; }

			// first part will be hypernet, second will not
			seq.split( ']' ).forEach( ( part, i ) => {
				if ( i === 0 ) {
					hypernets.push( part );
				} else {
					seqs.push( part );
				}
			});

		} );

		return { seqs, hypernets };
	});

	// puzzle 1
	const puzzle1 = ips
		.map( isTLS )
		.reduce( sum, 0 );

	// puzzle 2
	const puzzle2 = ips.map( isSSL )
		.reduce( sum, 0);

	console.log( 'Answer 1 - ', puzzle1 ); // eslint-disable-line no-console
	console.log( 'Answer 2 - ', puzzle2 ); // eslint-disable-line no-console
} );
