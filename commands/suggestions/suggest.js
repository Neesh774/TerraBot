const Discord = require('discord.js');
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');
module.exports = {
	name: 'suggest',
	category: 'suggestions',
	description: 'Suggest something in the suggestions channel!',
	usage: `${config.prefix}suggest <suggestion>`,
	run: async (client, message, args) => {
		// command
		const numSuggest = await sSchema.countDocuments({});
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle(`Suggestion #${numSuggest + 1}`)
			.setDescription(args.join(' '));
		const PS = await client.guilds.fetch(config.PS);
		const suggest = await PS.channels.cache.get(config.suggestions);
		message.delete().then(msg =>{
			suggest.send(embed).then(msgtwo =>{
				const sSuggest = new sSchema({
					id: numSuggest + 1,
					suggestion: args.join(' '),
					createdBy: message.author.tag,
					createdByIcon: message.author.avatarURL(),
					createdByID: message.author.id,
					createdAt: message.createdAt.toUTCString(),
					messageID: msgtwo.id,
					status: 'Unread',
					reason: 'N/A',
					upvotes: 0,
					downvotes: 0,
				});
				sSuggest.save().catch(err => console.log(err));
				msgtwo.react(config.upvote);
				msgtwo.react(config.downvote);
			});
		});
	},
};