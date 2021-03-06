const Discord = require('discord.js');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'kick',
	category: 'moderation',
	description: 'kicks a mentioned user',
	usage: `${config.prefix}kick <user> [reason]`,
	run: async (client, message, args) => {
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);

		try {
			if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**');
			if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**');

			if (!args[0]) return message.channel.send('**Enter A User To Kick!**');

			const kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
			if (!kickMember) return message.channel.send('**User Is Not In The Guild!**');

			if (kickMember.id === message.member.id) return message.channel.send('**You Cannot Kick Yourself!**');

			if (!kickMember.kickable) return message.channel.send('**Cannot Kick This User!**');
			if (kickMember.user.bot) return message.channel.send('**Cannot Kick A Bot!**');

			const reason = args.slice(1).join(' ');
			try {
				const sembed2 = new MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**You Have Been Kicked From ${message.guild.name} for - ${reason || 'No Reason!'}**`)
					.setFooter(message.guild.name, message.guild.iconURL());
				kickMember.send(sembed2).then(() =>
					kickMember.kick()).catch(() => null);
			}
			catch {
				kickMember.kick();
			}
			if (reason) {
				const sembed = new MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`);
				message.channel.send(sembed);
			}
			else {
				const sembed2 = new MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${kickMember.user.username}** has been kicked`);
				message.channel.send(sembed2);
			}

			const embed = new MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
				.setFooter(message.guild.name, message.guild.iconURL())
				.addField('**Moderation**', 'kick')
				.addField('**User Kicked**', kickMember.user.username)
				.addField('**Kicked By**', message.author.username)
				.addField('**Reason**', `${reason || '**No Reason**'}`)
				.addField('**Date**', message.createdAt.toLocaleString())
				.setTimestamp();

			logs.send(embed);
		}
		catch (e) {
			console.log(e.stack);
			return message.channel.send('**:x: Error, please try again.**');
		}
	},
};
