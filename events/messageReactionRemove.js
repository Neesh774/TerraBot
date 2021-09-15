const Discord = require('discord.js');
const config = require('../config.json');
const rrSchema = require('../models/rrschema.js');
const sSchema = require('../models/suggestschema.js');
module.exports = {
	name: 'messageReactionRemove',
	async execute(messageReaction, user, client) {
		if (messageReaction.message.guild.id != config.PS) return;
		const message = messageReaction.message;
		const schema = await rrSchema.findOne({ channelID: message.channel.id, messageID: message.id, reactionID: messageReaction.emoji.id ?? messageReaction.emoji.name });
		if (schema) {
			const member = message.guild.members.cache.get(user.id);
			if (member.roles.cache.has(schema.roleID)) {
				member.roles.remove(schema.roleID);
				member.send({ content: `Removed your ${message.guild.roles.cache.get(schema.roleID).name} role in ${message.guild.name}!` });
				const PS = await client.guilds.fetch(config.PS);
				const logs = await PS.channels.cache.get(config.logs);
				const embed = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setTitle('Reaction role removed')
					.setDescription(`${user.tag} was removed from the ${message.guild.roles.cache.get(schema.roleID).name} role.`)
					.setTimestamp()
					.setAuthor(user.tag, user.avatarURL());
				return logs.send({ embeds: [embed] });
			}
		}
		const suggest = await sSchema.findOne({ messageID: message.id });
		if (suggest && !user.bot) {
			switch (messageReaction.emoji.id) {
			case (config.upvote):
				suggest.upvotes--;
				break;
			case (config.downvote):
				suggest.downvotes--;
				break;
			}
			await suggest.save();
		}
	},
};