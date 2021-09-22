const Discord = require('discord.js');
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');
module.exports = {
	name: 'suggestmark',
	category: 'suggestions',
	description: 'Marks the given suggestion with the given status',
	usage: `${config.prefix}suggestmark <suggestion id> <Dead|In_Progress|Done> [reason]`,
	options: [
		{
			name: 'suggestion_id',
			type: 'INTEGER',
			description: 'The ID of the suggestion you want to mark',
			required: true,
		},
		{
			name: 'mark',
			type: 'STRING',
			description: 'The status you want to give to the suggestion',
			required: true,
			choices: [
				{
					name: 'Rejected',
					value: 'dead',
				},
				{
					name: 'Undertaken',
					value: 'in_progress',
				},
				{
					name: 'Implemented',
					value: 'done',
				},
			],
		},
		{
			name: 'reason',
			type: 'STRING',
			description: 'The reason you\'re marking this suggestion',
			required: false,
		},
	],
	run: async (client, interaction) => {
		// command
		const numSuggest = await sSchema.countDocuments({});
		const id = interaction.options.getInteger('suggestion_id');
		if (id > numSuggest) {
			return interaction.editReply('That suggestion doesn\'t exist!');
		}
		const suggest = await sSchema.findOne({ id: id }).exec();
		const mark = interaction.options.getBoolean('mark');
		suggest.status = mark;
		suggest.reason = interaction.options.getString('reason') ?? 'N/A';
		suggest.save();
		const PS = await client.guilds.fetch(config.PS);
		const suggestChannel = await PS.channels.cache.get(config.suggestions);

		const sMessage = await suggestChannel.messages.fetch(suggest.messageID);
		if (suggest.status === 'dead') {
			const newSuggest = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`Suggestion #${id} marked as rejected`)
				.setDescription(`${suggest.suggestion}`)
				.addField('Status', 'Dead')
				.addField('Reason', `${suggest.reason}`);
			await sMessage.edit({ embeds: [newSuggest] });
		}
		else if (suggest.status === 'in_progress') {
			const newSuggest = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`Suggestion #${id} marked as undertaken!`)
				.setDescription(`${suggest.suggestion}`)
				.addField('Status', 'In Progress')
				.addField('Reason', `${suggest.reason}`);
			await sMessage.edit({ embeds: [newSuggest] });
		}
		else if (suggest.status === 'done') {
			const newSuggest = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`Suggestion #${id} marked as implemented`)
				.setDescription(`${suggest.suggestion}`)
				.addField('Status', 'Implemented')
				.addField('Reason', `${suggest.reason}`);
			await sMessage.edit({ embeds: [newSuggest] });
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Suggestion #' + id + ' updated successfully!')
			.setDescription(`${suggest.suggestion}`)
			.addField('Status', `${suggest.status}`)
			.addField('Reason', `${suggest.reason}`)
			.setAuthor(suggest.createdBy, suggest.createdByIcon);
		return interaction.editReply({ embeds: [embed] });
	},
};