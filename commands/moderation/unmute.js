const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'unmute',
	category: 'moderation',
	description: 'TerraBot brings the user back from the land of the rats',
	usage: `${config.prefix}unmute <user>`,
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user you want to unmute',
			required: true,
		},
	],
	run: async (client, message, args) => {
		// command
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		if(!args[0]) {
			return message.reply('You need to give me someone to unmute!');
		}
		const memberID = args[0].substring(3, 21);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const member = await PS.members.fetch(memberID);
		if(!member.roles.cache.has(config.mutedRole)) {
			return message.reply('That user isn\'t muted.');
		}
		member.roles.remove(message.guild.roles.cache.get(config.mutedRole));
		return message.reply(`Unmuted ${member.toString()}`);
	},
};