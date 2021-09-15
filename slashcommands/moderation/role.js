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
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.editReply('You don\'t have permissions for that :/');
		}
		const role = interaction.options.getRole('role');

		const PS = await client.guilds.fetch(config.PS);
		const member = interaction.options.getUser('user');
		if (member.roles.cache.has(role.id)) {
			member.roles.remove(role.id);
			return interaction.editReply(`Removed the role ${role.name} from ${member.nickname}`);
		}
		member.roles.add(role);
		return interaction.editReply(`Gave ${member.user.username} the role ${role.name}`);
	},
};