const Discord = require('discord.js');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ban',
	category: 'moderation',
	description: 'bans a mentioned user',
	usage: `${config.prefix}ban <user> [reason]`,
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to be banned',
			required: true,
		},
		{
			name: 'reason',
			type: 'STRING',
			description: 'The reason to ban them',
			required: false,
		},
	],
	moderation: true,
	run: async (client, interaction) => {
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);

		try {
			if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) return interaction.editReply({ content: '**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**' });
			const banMember = interaction.options.getMember('user');

			if (banMember === interaction.member) return interaction.editReply({ content: '**You Cannot Ban Yourself**' });

			const reason = interaction.options.getString('reason');
			console.log(banMember);
			// if (!banMember.bannable) return interaction.editReply({ content: '**Can\'t ban that user**' });
			try {
				interaction.guild.members.ban(banMember);
				banMember.send({ content: `**Hello, You Have Been Banned From ${interaction.guild.name} for - ${reason || 'No Reason'}**` }).catch(() => null);
			}
			catch {
				interaction.guild.members.ban(banMember);
			}
			if (reason) {
				const sembed = new MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${banMember.user.username}** has been banned for ${reason}`);
				interaction.editReply({ embeds: [sembed] });
			}
			else {
				const sembed2 = new MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${banMember.user.username}** has been banned`);
				interaction.editReply({ embeds: [sembed2] });
			}

			const embed = new MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
				.setFooter(interaction.guild.name, interaction.guild.iconURL())
				.addField('**Moderation**', 'ban')
				.addField('**Banned**', banMember.user.username)
				.addField('**ID**', `${banMember.id}`)
				.addField('**Banned By**', interaction.user.username)
				.addField('**Reason**', `${reason || '**No Reason**'}`)
				.addField('**Date**', interaction.createdAt.toLocaleString())
				.setTimestamp();
			logs.send({ embeds: [embed] });
		}
		catch (e) {
			console.log(e.stack);
			return interaction.editReply({ content:'**:x: Error, please try again**' });
		}
	},
};
