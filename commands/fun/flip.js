const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'flip',
	category: 'fun',
	description: 'Flips a coin',
	usage: `${config.prefix}flip`,
	run: async (client, message, args) => {
		var result = Math.round(Math.random());
		var string = '';
		if(result == 1) {
			string = 'Heads';
		}
		else{
			string = 'Tails';
		}
		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setDescription(`You got a ${string}!`)
			.setThumbnail('https://cdn.onlinewebfonts.com/svg/img_441781.png');
		return message.reply({ embeds: [embed] });
	},
};