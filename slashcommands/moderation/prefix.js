const Discord = require('discord.js');
const config = require('../../config.json');
const fs = require('fs');
module.exports = {
	name: 'prefix',
	category: 'moderation',
	description: 'TerraBot changes it\'s own prefix!',
	usage: `${config.prefix}prefix <prefix>`,
	options: [
		{
			name: 'prefix',
			type: 'STRING',
			description: 'The new prefix',
			required: true,
		},
	],
	moderation: true,
	run: async (client, interaction) => {
		// command

		config.prefix = interaction.options.getString('prefix');
		fs.writeFileSync('config.json', JSON.stringify(interaction.options.getString('prefix')));
	},
};