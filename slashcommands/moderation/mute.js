const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require('ms');
module.exports = {
	name: 'mute',
	category: 'moderation',
	description: 'TerraBot exiles the user to the land of the rats',
	usage: `${config.prefix}mute <user> [time]`,
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to mute',
			required: true,
		},
		{
			name: 'time',
			type: 'STRING',
			description: 'How long TerraBot should mute them',
			required: false,
		},
	],
	moderation: true,
	run: async (client, interaction) => {
		// command
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.editReply('You don\'t have permissions for that :/');
		}
		const member = interaction.options.getMember('user');
		if (!member) return interaction.editReply({ content: '**User Is Not In The Guild**' });
		if (member === interaction.member) return interaction.editReply({ content: '**You Cannot Mute Yourself**' });
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		let logEmb;
		if (!member.roles.cache.has(config.cafeGuest)) {
			return interaction.editReply('That user is already muted.');
		}
		if (!interaction.options.getString('time')) {
			member.roles.remove(interaction.guild.roles.cache.get(config.cafeGuest));
			member.send({ content:`You were muted in ${interaction.guild.name}` });
			interaction.editReply(`Muted ${member.toString()}`);
			logEmb = new Discord.MessageEmbed()
				.setTitle(`${member.user.username} Muted`)
				.setColor(config.embedColor)
				.addField('Moderator', interaction.user.toString(), true)
				.setFooter(`ID | ${member.id}`, member.user.displayAvatarURL());
		}
		else {
			let time;
			try {
				time = ms(interaction.options.getString('time'));
			}
			catch (e) {return interaction.editReply({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });}
			interaction.editReply(`Muted ${member.toString()}`);
			member.roles.remove(interaction.guild.roles.cache.get(config.cafeGuest));
			member.send({ content: `You were muted in ${interaction.guild.name} for ${interaction.options.getString('time')}` });
			setTimeout(() => {
				member.send({ content: 'You were unmuted in ' + interaction.guild.name });
				member.roles.add(interaction.guild.roles.cache.get(config.cafeGuest));
			}, time);
			logEmb = new Discord.MessageEmbed()
				.setTitle(`${member.user.username} Muted for ${interaction.options.getString('time')}`)
				.setColor(config.embedColor)
				.addField('Moderator', interaction.user.toString(), true)
				.setFooter(`ID | ${member.id}`, member.user.displayAvatarURL());
		}
		return logs.send({ embeds: [logEmb] });
	},
};