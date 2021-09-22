const Discord = require('discord.js');
const config = require('../../config.json');
const arSchema = require('../../models/arschema.js');
module.exports = {
	name: 'aradd',
	category: 'Custom Commands and Auto Reponses',
	description: 'Creates a new auto responder',
	usage: `${config.prefix}aradd <trigger> <response> [another response] [another response]...`,
	options: [{
		name: 'trigger',
		type: 'STRING',
		description: 'The phrase that will trigger this auto response',
		required: true,
	},
	{
		name: 'responses',
		type: 'STRING',
		description: 'The phrases that will be sent to the user, separated by \'&&\'',
	}],
	run: async (client, interaction) => {
		// command
		const numResponders = await arSchema.countDocuments({});
		const trigger = interaction.options.getString('trigger');
		const responses = interaction.options.getString('responses').split('&&');
		const ar = new arSchema({
			id: numResponders + 1,
			trigger: trigger,
			responsesArray: responses,
			created: interaction.createdAt.toUTCString(),
			createdByID: interaction.user.id,
		});
		ar.save().catch(err => console.log(err));
		const fields = [];
		for (let i = 0;i < responses.length;i++) {
			fields.push({ 'name':`Response #${i + 1}`, 'value': responses[i] });
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTimestamp()
			.setTitle('Auto Response Created')
			.setDescription(`An auto responder was created by ${interaction.user.tag}`)
			.addField('Trigger', trigger)
			.addFields(fields);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		logs.send({ embeds: [embed] });
		return interaction.editReply({ embeds: [embed] });
	},
};