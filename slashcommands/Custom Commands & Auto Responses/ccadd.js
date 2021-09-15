const Discord = require('discord.js');
const config = require('../../config.json');
const ccSchema = require('../../models/ccschema.js');
module.exports = {
	name: 'ccadd',
	category: 'Custom Commands and Auto Reponses',
	description: 'Creates a new custom command',
	usage: `${config.prefix}ccadd <trigger> <response URL> [another response URL] [another response URL]...`,
	options: [
		{
			name: 'trigger',
			type: 'STRING',
			description: 'The phrase that will trigger the custom command',
			required: true,
		},
		{
			name: 'responses',
			type: 'STRING',
			description: 'The url or phrase that will be sent with this command, separated by \'&&\'',
			required: true,
		},
	],
	run: async (client, interaction) => {
		// command
		const numCommands = await ccSchema.countDocuments({});
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.editReply('You don\'t have permissions for that :/');
		}
		const trigger = interaction.options.get('trigger');
		const responses = interaction.options.getString('responses').split('&&');
		const cc = new ccSchema({
			id: numCommands + 1,
			trigger: trigger,
			responsesArray: responses,
			created: interaction.createdAt.toUTCString(),
			createdByID: interaction.user.id,
		});
		cc.save().catch(err => console.log(err));
		const fields = [];
		for (let i = 0;i < responses.length;i++) {
			fields.push({ 'name':`Response #${i + 1}`, 'value': responses[i] });
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTimestamp()
			.setTitle('Custom Command Created')
			.setDescription(`A custom command was created by ${interaction.user.tag}`)
			.addField('Trigger', trigger)
			.addFields(fields);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		logs.send({ embeds: [embed] });
		return interaction.editReply({ embeds: [embed] });
	},
};