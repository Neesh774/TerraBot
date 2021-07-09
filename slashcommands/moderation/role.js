const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'role',
	category: 'moderation',
	description: 'TerraBot gives the user whatever role you tell it to',
	usage: `${config.prefix}role <user> <role name>`,
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to give the role to',
			required: true,
		},
		{
			name: 'role',
			type: 'ROLE',
			description: 'The role to give them',
			required: true,
		},
	],
	run: async (client, message, args) => {
		// command
		if(!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		if(!args[0]) {
			return message.reply('You need to give me someone to give/remove the role!');
		}
		if(!args[1]) {
			return message.reply('You need to give me a role to give/remove to them!');
		}
		const role = message.guild.roles.cache.find(r => r.name === args[1]);
		if(!role) {
			return message.reply(`Couldn't find role ${args[1]} >_<`);
		}
		const memberID = args[0].substring(3, 21);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const member = await PS.members.fetch(memberID);
		if(member.roles.cache.has(role.id)) {
			member.roles.remove(role.id);
			return message.reply(`Removed the role ${role.name} from ${member.nickname}`);
		}
		member.roles.add(role);
		return message.reply(`Gave ${member.user.username} the role ${role.name}`);
	},
};