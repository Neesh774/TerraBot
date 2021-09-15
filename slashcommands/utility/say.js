const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'say',
	category: 'utility',
	description: 'TerraBot will repeat you.',
	usage: `${config.prefix}say <text>`,
	options: [
		{
			name: 'text',
			type: 'STRING',
			description: 'The text TerraBot should say',
			required: true,
		},
	],
	ephemeral: true,
	moderation: true,
	run: async (client, interaction) => {
		// command
		const string = interaction.options.getString('text');
		interaction.editReply({ content: `Successfully said ${string}`, ephemeral: true }).then(()=> {
			return interaction.channel.send({ content: string });
		});
	},
};