const { MessageEmbed } = require('discord.js');
const Reddit = require('@cxllm/reddit');
const config = require('../../config.json');

module.exports = {
	name: 'meme',
	category: 'fun',
	description: 'Sends a random meme from Reddit',
	usage: `${config.prefix}meme`,
	run: async (client, message, args) => {
		const sub = 'dankmemes';

		const post = await Reddit.top(sub);
		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setImage(post.image)
			.setTitle(`${post.title}`)
			.setFooter(`${post.upvotes} 👍 | Created by ${post.author} | From /r/${sub}`)
			.setURL(post.url);

<<<<<<< HEAD
        message.reply({embeds: [embed]});
    }
}
=======
		message.channel.send({ embeds: [embed] });
	},
};
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
