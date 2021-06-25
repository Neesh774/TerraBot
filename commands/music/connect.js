/* eslint-disable no-undef */
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
<<<<<<< HEAD
  name: "connect",
  category: "music", 
  description: "TerraBot will connect to your voice channel",
  usage: `${config.prefix}connect`,
  run: async (client, message) => {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.reply(
       {content: "You must Join a voice channel before using this command!"}
      );
=======
	name: 'connect',
	category: 'music',
	description: 'TerraBot will connect to your voice channel',
	usage: `${config.prefix}connect`,
	run: async (client, message) => {
		const channel = message.member.voice.channel;
		if (!channel) {
			return message.channel.send(
				{ content: 'You must Join a voice channel before using this command!' },
			);
		}
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221

		if (!channel.permissionsFor(message.client.user).has('CONNECT')) {return error('I don\'t have permission to join the voice channel');}

		if (!channel.permissionsFor(message.client.user).has('SPEAK')) {return error('I don\'t have permission to speak in the voice channel');}

		await channel.join();

<<<<<<< HEAD
    return message.reply(
      new MessageEmbed()
        .setDescription("**Joined the voice channel :white_check_mark: **")
        .setColor(config.embedColor)
    );
  },
}
=======
		return message.channel.send(
			new MessageEmbed()
				.setDescription('**Joined the voice channel :white_check_mark: **')
				.setColor(config.embedColor),
		);
	},
};
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
