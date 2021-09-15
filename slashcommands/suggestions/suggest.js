const Discord = require('discord.js');
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');
module.exports = {
	name: 'suggest',
	category: 'suggestions',
	description: 'Suggest something in the suggestions channel!',
	usage: `${config.prefix}suggest <suggestion>`,
	options: [
		{
			name: 'suggestion',
			type: 'STRING',
			description: 'The text you want to suggest',
			required: true,
		},
	],
	run: async (client, interaction) => {
		// command
		const numSuggest = await sSchema.countDocuments({});
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle(`Suggestion #${numSuggest + 1}`)
			.setDescription(interaction.options.getString('suggestion'));
		const PS = await client.guilds.fetch(config.PS);
		const suggest = await PS.channels.cache.get(config.suggestions);

		await suggest.send({ embeds: [embed] }).then(msgtwo => {
			const sSuggest = new sSchema({
				id: numSuggest + 1,
				suggestion: interaction.options.getString('suggestion'),
				createdBy: interaction.user.username,
				createdByIcon: interaction.user.avatarURL(),
				createdByID: interaction.user.id,
				createdAt: interaction.createdAt.toUTCString(),
				messageID: msgtwo.id,
				status: 'Unread',
				reason: 'N/A',
				upvotes: 0,
				downvotes: 0,
			});
			sSuggest.save().catch(err => console.log(err));
			msgtwo.react(config.upvote).catch(err => msgtwo.react('👍'));
			msgtwo.react(config.downvote).catch(err => msgtwo.react('👎'));
		});
		interaction.editReply({ content: 'Your suggestion has been sent!', ephemeral: true });
	},
};