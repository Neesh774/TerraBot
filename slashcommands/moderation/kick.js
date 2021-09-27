const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'kick',
	category: 'moderation',
	description: 'kicks a mentioned user',
	usage: `${config.prefix}kick <user> [reason]`,
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to be kicked',
			required: true,
		},
		{
			name: 'reason',
			type: 'STRING',
			description: 'The reason to kick them',
			required: false,
		},
	],
	moderation: true,
	run: async (client, interaction) => {
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const mentionedMember = interaction.options.getUser('user');

		if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('I don\'t have permission to kick members.')
		}
		else if (!mentionedMember) {
			return message.channel.send('You need to mention a member you want to kick.')
		}

		const mentionedPosition = mentionedMember.roles.highest.position
		const memberPotition = message.member.roles.highest.position
		const botPotision = message.guild.me.roles.highest.position

		if (memberPotition <= mentionedPosition) {
			return message.channel.send('You can\'t kick this member beacuse their role is higher to yours.')
		}
		else if (botPotision <= mentionedPosition) {
			return message.channel.send('You can\'t kick this member beacuse their role is higher to mine.')
		}

		const reason = interaction.options.getString('reason');
		try {
			await mentionedMember.kick(reason);
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
				.setFooter(interaction.guild.name, interaction.guild.iconURL())
				.addField('**Moderation**', 'kick')
				.addField('**User Kicked**', kickMember.user.username)
				.addField('**Kicked By**', interaction.user.username)
				.addField('**Reason**', `${reason || '**No Reason**'}`)
				.addField('**Date**', interaction.createdAt.toLocaleString())
				.setTimestamp();

			logs.send({ embeds: [embed] });
		}
		catch {
			console.log(e.stack);
			return interaction.editReply({ content:'**:x: Error, please try again**' });
		}
	}
};