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
	moderation: true,
	run: async (client, interaction) => {
		// command
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const member = interaction.options.getMember('user');
		if (!member.roles.cache.has(config.mutedRole)) {
			return interaction.editReply('That user isn\'t muted.');
		}
		member.roles.remove(interaction.guild.roles.cache.get(config.mutedRole));
		const logEmb = new Discord.MessageEmbed()
				.setTitle(`${member.user.username} Muted`)
				.setColor(config.embedColor)
				.addField('Moderator', interaction.user.toString(), true)
				.setFooter(`ID | ${member.id}`, member.user.displayAvatarURL());
		logs.send({ embeds: [logEmb] });
		return interaction.editReply(`Unmuted ${member.toString()}`);
	},
};