const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: '8ball',
	category: 'fun',
	description: 'returns a response based on your question',
	usage: `${config.prefix}8ball <question>`,
	run: async (client, message, args) => {
		// command
		var rand = ['Yes', 'No', 'Why are you even trying?', 'What do you think? NO', 'Maybe', 'Never', 'Yep'];
		var ranInt = Math.floor(Math.random() * (rand.length - 1));

		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setDescription(rand[ranInt])
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/8_ball_icon.svg/1024px-8_ball_icon.svg.png');
		return message.channel.send({ embeds: [embed] });
	},
};