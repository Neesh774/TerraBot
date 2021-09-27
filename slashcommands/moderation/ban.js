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
			const mentionedUser = await interaction.options.getUser('user');

			if (!interaction.member.hasPermission('BAN_MEMBERS')) {
				return interaction.editReply('You don\'t have permission to ban members.')
			}
			else if (!interaction.guild.me.hasPermission('BAN_MEMBERS')) {
				return interaction.editReply('I don\'t have permission to ban members.')
			}
			else if (!mentionedUser) {
				return interaction.editReply('You need to mention a member to ban.')
			}

			const allBans = await interaction.guild.fetchBans()

			if (allBans.get(mentionedUser.id)) {
				return interaction.editReply('This member is already banned.')
			}

			const mentionedMember = interaction.guild.members.cache.get(mentionedUser.id)

			if (mentionedMember) {
				const mentionedPotision = mentionedMember.roles.highest.position
				const memberPosition = interaction.member.roles.highest.position
				const botPosition = interaction.guild.me.roles.highest.position

				if (memberPosition <= mentionedPotision) {
					return interaction.editReply('You can\'t ban this member beacuse they are higher in the role hierarchy than you.')
				}
				else if (botPosition <= mentionedPotision) {
					return interaction.editReply('I can\'t ban this member because they are higher in the role hierarchy than me.')
				}
			}

			const reason = args.slice(1).join(' ') || 'Not Specified'

			interaction.guild.members.ban(mentionedUser.id, { reason: reason })

			interaction.editReply(new Discord.MessageEmbed()
				.setAuthor(`${interaction.user.tag}`, interaction.user.avatarURL())
				.addField('**Member**', `${mentionedUser}`)
				.addField("**Action**", "Ban")
				.addField("**Reason**", `${reason ? `${reason}` : ''}`)
				.setTimestamp(interaction.createdAt)
				.setThumbnail(mentionedUser.displayAvatarURL({ dynamic: true }))
				
				.setColor(colors.ban))

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
