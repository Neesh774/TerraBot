const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'prefix',
	category: 'moderation',
	description: 'TerraBot changes it\'s own prefix!',
	usage: `${config.prefix}prefix <prefix>`,
	run: async (client, message, args) => {
		// command
		if(!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		if(!args[0]) {
			return message.reply('You need to give me a new prefix!');
		}
		config.prefix = args[0];
	},
};