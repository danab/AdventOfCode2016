'use strict';

const start = new Date();
// this is small, I feel like maybe I could do this by hand...
const str = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 18 c
cpy 11 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;


const instructions = str.split( '\n' ).map( (line) => line.split( ' ' ) );

const doInstruction = ( idx ) => {
	const instruction = instructions[ idx ];

	switch ( instruction[0] ) {
	case 'cpy':
		return doCopy( instruction[1], instruction[2] );
	case 'inc':
		return doInc( instruction[1] );
	case 'dec':
		return doDec( instruction[1] );
	case 'jnz':
		return doJnz( instruction[1], +instruction[2] );
	}
};

const doCopy = ( val, register ) => {
	if ( val === 'a' || val === 'b' || val === 'c' || val === 'd' ) {
		val = registers[ val ];
	} else {
		val = +val;
	}
	registers[ register ] = val;
	instructionIdx += 1;
};

const doInc = ( register ) => {
	registers[ register ] = registers[ register ] + 1;
	instructionIdx += 1;
};

const doDec = ( register ) => {
	registers[ register ] = registers[ register ] - 1;
	instructionIdx += 1;
};

const doJnz = ( register, skips ) => {
	if ( registers[ register ] !== 0 ) {
		instructionIdx += skips;
	} else {
		instructionIdx += 1;
	}
};

let registers = { a: 0, b: 0, c: 0, d: 0 };
let instructionIdx = 0;
while ( instructionIdx < instructions.length ) {
	doInstruction( instructionIdx );
}
console.log( 'Answer 1 -', registers ); // eslint-disable-line no-console

registers = { a: 0, b: 0, c: 1, d: 0 };
instructionIdx = 0;
while ( instructionIdx < instructions.length ) {
	doInstruction( instructionIdx );
}
console.log( 'Answer 2 -', registers ); // eslint-disable-line no-console

const end = new Date();
console.log( `Took ${(end-start)/1000} seconds.` ); // eslint-disable-line no-console
