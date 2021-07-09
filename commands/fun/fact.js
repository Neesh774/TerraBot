const client = require('nekos.life');
const Discord = require('discord.js');
const tb = new client();
const config = require('../../config.json');


module.exports = {
	name: 'fact',
	category: 'fun',
	description: 'sends a random fact',
	usage: `${config.prefix}fact`,
	run: async (_client, message, args) => {
		// command

		async function work() {

			const bean = (await tb.sfw.fact());
			message.reply({ content: bean.fact }).catch(error => {
				console.error(error);
				return message.reply({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });
			});

		}

		work();
	},
};