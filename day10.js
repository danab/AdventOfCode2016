'use strict';

const fs = require('fs');

fs.readFile( 'day10.txt', ( err, data ) => {
	if (err) {
		return console.error(err); // eslint-disable-line no-console
	}

	const instructions = data.toString().split('\n').map(line => line.split(' '));

	const initial = instructions
		.filter(words => words[0] === 'value')
		.map(words => [words[1], words[5]]);

	const swapInstructions = instructions
		.filter(words => words[0] === 'bot')
		.map(words => {
			return [words[1], words[5], words[6], words[10], words[11]];
		});

	const bots = [];
	const outputs = [];
	const swaps = [];

	initial.forEach(instruction => {
		const val = +instruction[0];
		const bot = instruction[1];
		bots[bot] = bots[bot] || [];
		bots[bot].push(val);
	});

	swapInstructions.forEach(words => {
		const bot = words[0];
		const lowType = words[1];
		const lowBot = +words[2];
		const highType = words[3];
		const highBot = +words[4];

		swaps[bot] = {lowType, lowBot, highType, highBot};
	});

	let desiredBot;

	const performSwap = (bot, high, low) => {
		const swap = swaps[bot];

		// part 1
		if ( high === 61 && low === 17 ) {
			desiredBot = bot;
		}

		// high
		if (swap.highType === 'bot') {
			bots[swap.highBot] = bots[swap.highBot] || [];
			bots[swap.highBot].push(high);
		} else {
			outputs[swap.highBot] = outputs[swap.highBot] || [];
			outputs[swap.highBot].push(high);
		}
		// low
		if (swap.lowType === 'bot') {
			bots[swap.lowBot] = bots[swap.lowBot] || [];
			bots[swap.lowBot].push(low);
		} else {
			outputs[swap.lowBot] = outputs[swap.lowBot] || [];
			outputs[swap.lowBot].push(low);
		}

		// clear the swapping bot
		bots[bot] = [];
	};

	let noBotHasPair = false;

	while ( !noBotHasPair ) {
		const botIdx = bots.findIndex((bot) => bot && bot.length === 2);
		if ( botIdx === -1 ) {
			noBotHasPair = true;
			break;
		}
		const bot = bots[botIdx];
		const high = Math.max(bot[0], bot[1]);
		const low = Math.min(bot[0], bot[1]);

		performSwap(botIdx, high, low);
	}

	console.log( 'Answer 1 - ', desiredBot ); // eslint-disable-line no-console
	console.log( 'Answer 2 - ', outputs[0][0] * outputs[1][0] * outputs[2][0] ); // eslint-disable-line no-console

});
