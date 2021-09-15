const Discord = require('discord.js');
const config = require('../../config.json');
const ccSchema = require('../../models/ccschema.js');
module.exports = {
	name: 'ccget',
	category: 'Custom Commands and Auto Reponses',
	description: 'Lists all custom commands',
	usage: `${config.prefix}ccget <command ID>`,
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
		const numCommands = await ccSchema.countDocuments({});
		const fields = [];
		const commandid = interaction.options.getInteger('command_id');
		if (commandid) {
			if (commandid > numCommands) {
				return interaction.editReply('That command doesn\'t exist!');
			}
			const command = ccSchema.findOne({ id: commandid - 1 });
			for (let i = 0; i < command.responses.length;i++) {
				fields.push({ 'name':`Response #${i + 1}`, 'value': `${command.responses[i]}` });
			}
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`Command #${command}`)
				.setDescription(command.trigger)
				.addFields(fields);
			return interaction.editReply({ embeds: [embed] });
		}
		else {
			// eslint-disable-next-line no-redeclare
			for (let i = 1;i < numCommands + 1;i++) {
				const command = await ccSchema.findOne({ id: i }).exec();
				fields.push({ 'name': `#${i}`, 'value': `Trigger: ${command.trigger}` });
			}
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle('Custom Commands')
				.addFields(fields);
			return interaction.editReply({ embeds: [embed] });
		}
	},
};