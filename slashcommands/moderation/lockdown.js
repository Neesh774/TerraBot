const config = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'lockdown',
	category: 'moderation',
	description: 'Locks every channel in the server',
	usage: `${config.prefix}lockdown`,
	options: [],
	moderation: true,
	run: async (client, interaction) => {
		if (!message.channel.permissionsFor(message.member).has('BAN_MEMBERS')) return interaction.editReply('You don\'t have permissions for that :/');
		const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
		if (!client.lockDown) {
			channels.forEach(channel => {
				channel.permissionOverwrites.edit(message.guild.roles.everyone, {
					SEND_MESSAGES: false,
				});
			});
			client.lockDown = true;
			const lockEmbed = new Discord.MessageEmbed()
				.setDescription(`Successfully locked ${channels.size} channels!`)
				.setColor(config.embedColor);
			return interaction.editReply({ embeds: [lockEmbed] });
		}
		else {
			channels.forEach(channel => {
				channel.permissionOverwrites.edit(message.guild.roles.everyone, {
					SEND_MESSAGES: true,
				});
			});
			client.lockDown = false;
			const lockEmbed = new Discord.MessageEmbed()
				.setDescription(`Successfully unlocked ${channels.size} channels!`)
				.setColor(config.embedColor);
			return interaction.editReply({ embeds: [lockEmbed] });
		}
	},
};