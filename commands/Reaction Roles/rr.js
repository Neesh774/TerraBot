const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.js');
const rrSchema = require('../../models/rrschema.js');
module.exports = {
	name: 'rr',
	category: 'Reaction Roles',
	description: 'Creates a reaction role on the given message with the given emote',
	usage: `${config.prefix}rr <Channel ID> <Message ID> <Role ID> <Reaction Emote>`,
	options: [
		{
			name: 'channel',
			type: 'CHANNEL',
			description: 'The channel you want to make the reaction role in',
			required: true,
		},
		{
			name: 'message_id',
			type: 'INTEGER',
			description: 'The ID of the message you want to set this reaction role on',
			required: true,
		},
		{
			name: 'role',
			type: 'ROLE',
			description: 'The role you want to give users on this reaction role',
			required: true,
		},
		{
			name: 'emoji',
			type: 'STRING',
			description: 'The emoji you want to have represent this reaction role',
			required: true,
		},
	],
	run: async (client, message, args) => {

		// command
		if (!args[0]) return message.channel.send({ content: ':x: | **Specify The ChannelID or mention The Channel**' });
		if (!args[1]) return message.channel.send({ content: ':x: | **Specify The messageID**' });
		if (!args[2]) return message.channel.send({ content: ':x: | **Specify The roleID or mention The Role**' });
		if (!args[3]) return message.channel.send({ content: ':x: | **Specify The emoji**' });
		try{
			const channel = message.mentions.channels.first() || await message.guild.channels.cache.get(args[0]);
			if (!channel) return message.channel.send({ content: ':x: | **Channel Not Found**' });
			const channelid = channel.id;

			const msg = await channel.messages.fetch(args[1]);
			if (!msg) return message.channel.send(':x: | **Message Not Found**');
			const mes = msg.id;

			let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
			if (!role) return message.channel.send({ content: ':x: | **Role Not Found**' });
			role = role.id;

			const emoji = await Discord.Util.parseEmoji(args[3]);
			if (!emoji && !emojis.includes(args[3])) return message.channel.send({ content: ':x: | **Specify a valid emoji**' });
			if (emoji && !emojis.includes(args[3])) {
				const checking = await client.emojis.cache.find(x => x.id === emoji.id);
				if (!checking) return message.channel.send({ content: ':x: | **Invalid Emoji**' });
			}
			const numRRs = await rrSchema.countDocuments({}) + 1;
			const rr = new rrSchema({
				id: numRRs,
				messageID: mes,
				channelID: channelid,
				roleID: role,
				reactionID: emoji.id,
			});
			rr.save();
			msg.react(emoji.id);
			const embed = new Discord.MessageEmbed()
				.setTitle('Success!')
				.setDescription('Reaction role spawned successfully')
				.setColor(config.embedColor);
			return message.channel.send({ embeds: [embed] });
		}
		catch (e) {
			console.log(e.stack);
			return message.channel.send({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });
		}
	},
};