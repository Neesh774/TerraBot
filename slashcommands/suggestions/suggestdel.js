const Discord = require('discord.js');
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');
module.exports = {
	name: 'suggestdel',
	category: 'Custom Commands and Auto Reponses',
	description: 'Deletes a certain suggestion',
	usage: `${config.prefix}suggestdel <suggestion ID>`,
	options: [
		{
			name: 'suggestion_id',
			type: 'INTEGER',
			description: 'The ID of the suggestion you want to delete',
			required: true,
		},
	],
	run: async (client, interaction) => {
		// command
		const numSuggests = await sSchema.countDocuments({});
		const id = interaction.options.getInteger('suggestion_id');
		if (id > numSuggests) {
			return interaction.editReply('That suggestion doesn\'t exist!');
		}
		const suggest = await sSchema.findOne({ id: id });
		await sSchema.deleteOne({ id: id });
		for (let i = suggest.id + 1;i < numSuggests + 1; i++) {
			const nextSuggest = await sSchema.findOne({ id:i });
			nextSuggest.id--;
			await nextSuggest.save();
		}
		const PS = await client.guilds.fetch(config.PS);
		const suggestChannel = await PS.channels.cache.get(config.suggestions);

		const sMessage = await suggestChannel.messages.fetch(suggest.messageID);
		await sMessage.delete();
		interaction.editReply(`Suggestion with content ${suggest.suggestion} successfully deleted!`);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Suggestion Deleted')
			.setTimestamp()
			.setDescription(`Suggestion with content ${suggest.suggestion} was cleared by user ` + interaction.user.tag);
		return logs.send({ embeds: [embed] });
	},
};