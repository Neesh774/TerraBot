const ms = require('ms');
const functions = require('../../functions/messageFuncs');
const config = require('../../config.json');

module.exports = {
	name: 'remindme',
	description: 'Set a reminder',
	usage: `${config.prefix}remindme <time> <reminder>`,
	options: [
		{
			name: 'time',
			type: 'STRING',
			description: 'The time in which TerraBot will remind you',
			required: true,
		},
		{
			name: 'reminder',
			type: 'STRING',
			description: 'The actual reminder',
			required: true,
		},
	],
	run: async (client, interaction) => {
		const timeArg = interaction.options.getString('time');
		const reminder = interaction.options.getString('reminder');
		functions.setReminder(timeArg, reminder, interaction.member, interaction);
	},
};