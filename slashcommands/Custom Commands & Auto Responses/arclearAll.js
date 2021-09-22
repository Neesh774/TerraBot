const Discord = require('discord.js');
const config = require('../../config.json');
const arSchema = require('../../models/arschema.js');
module.exports = {
	name: 'arclearall',
	category: 'Custom Commands and Auto Reponses',
	description: 'Clears all auto responders',
	usage: `${config.prefix}arclearall`,
	options: [],
	run: async (client, interaction) => {
		await arSchema.deleteMany();
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Responders were cleared')
			.setTimestamp()
			.setDescription('Responders were cleared by user ' + interaction.user.tag);
		logs.send({ embeds: [embed] });
		return interaction.editReply('Successfully cleared the commands list!');

	},
};