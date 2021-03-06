const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'mock',
	category: 'fun',
	description: 'Will mock the text you give me',
	usage: `${config.prefix}mock <text>`,
	run: async (client, message, args) => {
		// command
		if(!args[0]) {
			return message.reply('What am I mocking?');
		}
		let text = args.join(' ');
		for(let i = 0; i < text.length;i++) {
			const ranInt = Math.round(Math.random());
			if(ranInt == 1) {
				text = text.replace(text[i], text[i].toUpperCase());
			}
		}
		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setDescription(text)
			.setThumbnail('https://media.tenor.com/images/d0f9e3756a2b5546d88d6716de6f8c3f/tenor.gif');
		return message.channel.send(embed);
	},
};