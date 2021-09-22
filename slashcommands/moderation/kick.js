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

		try {
			const kickMember = interaction.options.getMember('user');
			if (!kickMember) return interaction.editReply({ content: '**User Is Not In The Guild!**' });

			if (kickMember.id === interaction.member.id) return interaction.editReply({ content: '**You Cannot Kick Yourself!**' });

			const reason = interaction.options.getString('reason');
			try {
				kickMember.send({ content: '`**You Have Been Kicked From ${interaction.guild.name} for - ${reason || \'No Reason!\'}**`' }).then(() =>
					kickMember.kick()).catch(() => null);
			}
			catch {
				kickMember.kick();
			}
			if (reason) {
				const sembed = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`);
				interaction.editReply({ embeds: [sembed] });
			}
			else {
				const sembed2 = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${kickMember.user.username}** has been kicked`);
				interaction.editReply({ embeds: [sembed2] });
			}

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
		catch (e) {
			console.log(e.stack);
			return interaction.editReply({ content: '**:x: Error, please try again.**' });
		}
	},
};
