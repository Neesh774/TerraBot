const Discord = require('discord.js');
const config = require('../../config.json');
const ccSchema = require('../../models/ccschema.js');
module.exports = {
	name: 'ccclearall',
	category: 'Custom Commands and Auto Reponses',
	description: 'Clears all custom commands',
	usage: `${config.prefix}ccclearall`,
	run: async (client, interaction) => {
		await ccSchema.deleteMany();
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Commands were cleared')
			.setTimestamp()
			.setDescription('Commands were cleared by user ' + message.user.tag);
		logs.send({ embeds: [embed] });
		return interaction.editReply('Successfully cleared the responders list!');

	},
};