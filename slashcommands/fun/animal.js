const { MessageEmbed } = require('discord.js');
const Reddit = require('@cxllm/reddit');
const config = require('../../config.json');

module.exports = {
	name: 'animal',
	category: 'fun',
	description: 'Sends a random animal picture from Reddit',
	usage: `${config.prefix}animal`,
	run: async (client, interaction) => {
		const sub = 'Animal';

		const post = await Reddit.top(sub);
		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setImage(post.image)
			.setTitle(`${post.title}`)
			.setFooter(`${post.upvotes} 👍 | Created by ${post.author} | From /r/${sub}`)
			.setURL(post.url);

		interaction.editReply({ embeds: [embed] });
	},
};
