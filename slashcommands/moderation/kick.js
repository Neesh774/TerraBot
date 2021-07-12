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
	run: async (client, message, args) => {
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);

		try {
			if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**');
			if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply('**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**');

			if (!args[0]) return message.reply({ content: '**Enter A User To Kick!**' });

			var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
			if (!kickMember) return message.reply({ content: '**User Is Not In The Guild!**' });

			if (kickMember.id === message.member.id) return message.reply({ content: '**You Cannot Kick Yourself!**' });

			if (!kickMember.kickable) return message.reply({ content: '**Cannot Kick This User!**' });
			if (kickMember.user.bot) return message.reply({ content: '**Cannot Kick A Bot!**' });

			var reason = args.slice(1).join(' ');
			try {
				const sembed2 = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**You Have Been Kicked From ${message.guild.name} for - ${reason || 'No Reason!'}**`)
					.setFooter(message.guild.name, message.guild.iconURL());
				kickMember.send({ embeds: [sembed2] }).then(() =>
					kickMember.kick()).catch(() => null);
			}
			catch {
				kickMember.kick();
			}
			if (reason) {
				var sembed = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`);
				message.reply({ embeds: [sembed] });
			}
			else {
				var sembed2 = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setDescription(`**${kickMember.user.username}** has been kicked`);
				message.reply({ embeds: [sembed2] });
			}

			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
				.setFooter(message.guild.name, message.guild.iconURL())
				.addField('**Moderation**', 'kick')
				.addField('**User Kicked**', kickMember.user.username)
				.addField('**Kicked By**', message.author.username)
				.addField('**Reason**', `${reason || '**No Reason**'}`)
				.addField('**Date**', message.createdAt.toLocaleString())
				.setTimestamp();

			logs.send({ embeds: [embed] });
		}
		catch (e) {
			console.log(e.stack);
			return message.reply({ content: '**:x: Error, please try again.**' });
		}
	},
};