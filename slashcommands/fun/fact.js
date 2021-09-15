const client = require('nekos.life');
const Discord = require('discord.js');
const tb = new client();
const config = require('../../config.json');


module.exports = {
	name: 'fact',
	category: 'fun',
	description: 'sends a random fact',
	usage: `${config.prefix}fact`,
	run: async (_client, interaction) => {
		// command

		async function work() {

			const bean = (await tb.sfw.fact());
			interaction.editReply({ content: bean.fact }).catch(error => {
				console.error(error);
				return interaction.editReply({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });
			});

		}

		work();
	},
};