const Discord = require('discord.js');
const mSchema = require('../../models/memberschema');
const sbSchema = require('../../models/starboard.js');
const config = require('../../config.json');

module.exports = {
	name: 'starboards',
	category: 'Starboards',
	description: 'Tells you how many starboards you have, or how many someone else has',
	usage: `${config.prefix}sbs [user]`,
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'The user to check the starboards of',
			required: false,
		},
	],
	run: async (client, interaction) => {
		const user = interaction.options.getUser('user') ?? interaction.user;
		const member = await mSchema.findOne({ userID: user.id });
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle(`${interaction.user.username}'s starboards`)
			.setAuthor('TerraBot Starboards', interaction.user.avatarURL());
		if (member.starboards > 0) {
			const fields = [];
			const starboards = await sbSchema.find({ authorID: user.id });
			const PS = await client.guilds.fetch(config.PS);
			for (let i = 0; i < starboards.length; i++) {
				const channel = await PS.channels.cache.get(starboards[i].channelID);
				const msg = await channel.messages.fetch(starboards[i].messageID);
				fields.push({ 'name': `#${i + 1}`, 'value': `[Jump!](${msg.url})` });
			}
			embed.addFields(fields);
		}
		return interaction.editReply({ embeds: [embed] });
	},
};