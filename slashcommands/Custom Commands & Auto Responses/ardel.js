const Discord = require('discord.js');
const config = require('../../config.json');
const arSchema = require('../../models/arschema.js');
module.exports = {
	name: 'ardel',
	category: 'Custom Commands and Auto Reponses',
	description: 'Delete a certain auto responder',
	usage: `${config.prefix}ardel <responder ID>`,
	options: [
		{
			name: 'responderid',
			type: 'INTEGER',
			description: 'Deletes an auto responder by its id',
			required: true,
		},
	],
	run: async (client, interaction) => {
		// responder
		const numResponders = await arSchema.countDocuments({});
		const fields = [];
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.editReply('You don\'t have permissions for that :/');
		}
		const id = interaction.options.getInteger('responderid');
		if (id > numResponders) {
			return interaction.editReply('That responder doesn\'t exist!');
		}
		const responder = await arSchema.findOne({ id: id });
		await arSchema.deleteOne({ id: id });
		for (let i = responder.id + 1;i < numResponders + 1; i++) {
			const nextResponse = await arSchema.findOne({ id:i });
			nextResponse.id--;
			await nextResponse.save();
		}
		interaction.editReply(`Responder with trigger ${responder.trigger} successfully deleted!`);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Responder Deleted')
			.setTimestamp()
			.setDescription(`Responder with trigger ${responder.trigger} was cleared by user ` + interaction.user.tag);
		return logs.send({ embeds: [embed] });
	},
};