const Discord = require('discord.js');
const sbSchema = require('../../models/starboard.js');
const config = require('../../config.json');

module.exports = {
	name: 'delsb',
	category: 'Starboards',
	description: 'Deletes a starboard',
	usage: `${config.prefix}delsb <id>`,
	options: [
		{
			name: 'message_id',
			type: 'STRING',
			description: 'The message id of the starboard message',
			required: true,
		},
	],
	run: async (client, interaction) => {
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.editReply('You don\'t have permissions for that :/');
		}
		const id = interaction.options.getString('message_id');
		const msg = await sbSchema.findOne({ starboardID: id });
		if (!msg) {
			return interaction.editReply('Sorry, I don\'t think that message is a starboard');
		}
		await sbSchema.deleteOne({ starboardID: id }).catch((e) => {return interaction.editReply('There was an error. Please try that again.');});
		const PS = await client.guilds.fetch(config.PS);
		const sbChannel = await PS.channels.cache.get(config.starboardChannel);

		const sMessage = await sbChannel.messages.fetch(id);
		await sMessage.delete();
		return interaction.editReply('Successfully deleted that starboard.');
	},
};