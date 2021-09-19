const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'serverinfo',
	category: 'utility',
	description: 'Shows info about a server',
	usage: `${config.prefix}serverinfo`,
	options: [],
	run: async (client, interaction) => {
		// command
		const servericon = interaction.guild.iconURL;
		const owner = await interaction.guild.fetchOwner();
		const channels = interaction.guild.channels.cache.size;
		const serverembed = new Discord.MessageEmbed()
			.setTitle('Server Information')
			.setColor(config.embedColor)
			.setThumbnail(servericon)
			.addField('Server Name', interaction.guild.name)
			.addField('Owner', owner.user.toString(), true)
			.addField('Channels', `${channels}`, true)
			.addField('Roles', `${interaction.guild.roles.cache.size}`, true)
			.addField('Created On', `${interaction.guild.createdAt}`)
			.addField('You Joined', `${interaction.member.joinedAt}`)
			.addField('Total Members', `${interaction.guild.memberCount}`)
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.setFooter(interaction.user.username, interaction.user.avatarURL());
		interaction.editReply({ embeds: [serverembed] });
	},
};