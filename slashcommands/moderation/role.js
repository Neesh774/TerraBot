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
	moderation: true,
	run: async (client, interaction) => {
		// command
		const role = interaction.options.getRole('role');
		const member = interaction.options.getUser('user');
		const mentionedPosition = member.roles.highest.position
		const memberPosition = interaction.member.roles.highest.position
		const botPosition = interaction.guild.me.roles.highest.position

		if (memberPosition <= mentionedPosition) {
			return message.channel.send('You can\'t give this role to that user because they are higher in the role hierarchy than you.')
		}
		else if (botPosition <= mentionedPosition) {
			return message.channel.send('You can\'t give this role to that user because I\'m not high enough in the role hierarchy.')
		}
		else if (memberPosition <= role.position) {
			return message.channel.send('You can\'t give this role to that user because the role is higher in the role hierarchy than you.')
		}
		else if (botPosition <= role.position) {
			return message.channel.send('You can\'t give this role to that user because the role is higher in the role hierarchy than me.')
		}
		const PS = await client.guilds.fetch(config.PS);
		if (member.roles.cache.has(role.id)) {
			member.roles.remove(role.id);
			return interaction.editReply(`Removed the role ${role.name} from ${member.nickname}`);
		}
		member.roles.add(role);
		return interaction.editReply(`Gave ${member.user.username} the role ${role.name}`);
	},
};