const Discord = require('discord.js');
const config = require('../../config.json');
const mcSchema = require('../../models/mchannelschema.js');
module.exports = {
	name: 'unmutexp',
	category: 'levels',
	description: 'TerraBot will stop ignoring this channel when counting xp',
	usage: `${config.prefix}unmutexp <channel>`,
	run: async (client, message, args) => {
		// command
		if(!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		if(!args[0]) {
			return message.reply('Which channel should I stop ignoring?');
		}
		const channelID = args[0].substring(2, 20);
		const channel = message.mentions.channels.first() || await message.guild.channels.cache.get(channelID);
		if (!channel) return message.channel.send(':x: | **Channel Not Found**');
		const mc = await mcSchema.findOne({ channel: channelID });
		if(!mc) {
			return message.reply('That channel isn\'t muted!');
		}
		else{
			await mcSchema.deleteOne({ channel: channelID });
		}
		return message.reply(`Successfully xp unmuted ${channel.toString()}`);
	},
};