const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'avatar',
	category: 'utility',
	description: 'Gets the avatar of a user or yourself',
	usage: `${config.prefix}avatar [user]`,
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user you want the avatar of',
			required: false,
		},
	],
	run: async (client, interaction) => {

		// command

		/* If user isnt found it selects ur profile */
		const member = interaction.options.getMember('member') ?? interaction.member;
		if (!member.user.avatarURL) return interaction.editReply({ content: 'That user does not have an avatar' });

		const avatar = new Discord.MessageEmbed()
			.setTitle(`${member.user.username}'s Avatar`)
			.setColor(config.embedColor)
			.setImage(member.user.avatarURL())
			.setColor(member.displayHexColor)
			.setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
			.setURL(member.user.avatarURL());
		interaction.editReply({ embeds: [avatar] })
		// If bot doesnt have embed perms
			.catch(() => interaction.editReply({ content: '**Error:** Missing permission `Embed link` ' }));

	},

};