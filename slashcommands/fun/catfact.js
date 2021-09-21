const { MessageEmbed } = require('discord.js');
const Reddit = require('@cxllm/reddit');
const config = require('../../config.json');
const fetch = require('node-fetch');
module.exports = {
	name: 'catfact',
	category: 'fun',
	description: 'Sends a random cat fact',
	usage: `${config.prefix}catfact`,
	run: async (client, interaction) => {
		const response = await fetch('https://catfact.ninja/fact');
        const json = await response.json();
        interaction.editReply(json.fact);
	},
};
