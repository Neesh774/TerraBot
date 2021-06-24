const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'roll',
	category: 'fun',
	description: 'Will roll a 6-sided die.',
	usage: `${config.prefix}roll [# sides]`,
	options: [
		{
			name: 'num_sides',
			type: 'INTEGER',
			description: 'The number of sides you want to roll',
			required: false,
		},
	],
	run: async (client, message, args) => {
		let sides = 6;
		if(args[0]) {
			sides = parseInt(args[0]);
		}
		if(isNaN(sides) || sides <= 0 || sides > 100) {
			return message.reply('Please make sure you\'re giving me a positive number less than 100.');
		}
		let num = Math.floor((Math.random() * sides) + 1);
		if(Math.floor(Math.random() * 30) == 28) {
			num = '69 lmao';
		}
		return message.reply(`You rolled a ${num}`);
	},
};