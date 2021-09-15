const Discord = require('discord.js');
const config = require('../../config.json');
const arSchema = require('../../models/arschema.js');
module.exports = {
	name: 'arget',
	category: 'Custom Commands and Auto Reponses',
	description: 'Lists all auto responses',
	usage: `${config.prefix}arget [command ID]`,
	options: [
		{
			name: 'command_id',
			type: 'INTEGER',
			description: 'The ID of the command you want info about',
			required: false,
		},
	],
	run: async (client, interaction) => {
		// command
		const numResponses = await arSchema.countDocuments({});
		const fields = [];
		const commandID = interaction.options.getInteger('command_id');
		if (commandID) {
			if (commandID > numResponses) {
				return interaction.editReply('That responder doesn\'t exist!');
			}
			const responder = await arSchema.findOne({ id: commandID });
			for (let i = 0; i < responder.responsesArray.length;i++) {
				fields.push({ 'name':`Response #${i + 1}`, 'value': `${responder.responsesArray[i]}` });
			}
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`Responder #${commandID}`)
				.setDescription(responder.trigger)
				.addFields(fields);
			return interaction.editReply({ embeds: [embed], ephemeral: false });
		}
		else {
			// eslint-disable-next-line no-redeclare
			for (let i = 1;i < numResponses + 1;i++) {
				const responder = await arSchema.findOne({ id: i }).exec();
				fields.push({ 'name': `#${i}`, 'value': `Trigger: ${responder.trigger}` });
			}
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle('Automatic Responder')
				.addFields(fields);
			return interaction.editReply({ embeds: [embed], ephemeral: false });
		}
	},
};