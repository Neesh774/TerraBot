const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'shuffle',
	category: 'music',
	description: 'TerraBot shuffles the music',
	usage: `${config.prefix}shuffle`,
	run: async (client, message, args) => {
		const channel = message.member.voice.channel;
		if (!channel) {
			return message.channel.send(
				'You must Join a voice channel before using this command!',
			);
		}
		const queue = message.client.queue.get(message.guild.id);
		if (!queue) {
			return message.channel.send(
				new MessageEmbed()
					.setDescription('** :x: There are no songs in queue to shuffle**')
					.setColor(config.embedColor),
			);
		}
		const songs = queue.queue;
		for (let i = songs.length - 1; i > 1; i--) {
			const j = 1 + Math.floor(Math.random() * i);
			[songs[i], songs[j]] = [songs[j], songs[i]];
		}
		queue.queue = songs;
		message.client.queue.set(message.guild.id, queue);
		message.channel
			.send(
				new MessageEmbed()
					.setDescription('** :white_check_mark: Shuffled the queue**')
					.setColor(config.embedColor),
			)
			.catch(console.error);
	},
};