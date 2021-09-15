const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: '8ball',
	category: 'fun',
	description: 'returns a response based on your question',
	usage: `${config.prefix}8ball <question>`,
	options: [
		{
			name: 'question',
			type: 'STRING',
			description: 'The question you want to ask the 8ball',
			required: true,
		},
	],
	run: async (client, interaction) => {
		// command
		const rand = ['Yes', 'No', 'Why are you even trying?', 'What do you think? NO', 'Maybe', 'Never', 'Yep'];
		const ranInt = Math.floor(Math.random() * (rand.length - 1));

		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setDescription(rand[ranInt])
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/8_ball_icon.svg/1024px-8_ball_icon.svg.png');
		return interaction.editReply({ embeds: [embed] });
	},
};