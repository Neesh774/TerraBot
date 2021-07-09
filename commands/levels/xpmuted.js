const Discord = require('discord.js');
const config = require('../../config.json');
const mcSchema = require('../../models/mchannelschema.js');
module.exports = {
	name: 'xpmuted',
	category: 'levels',
	description: 'TerraBot lists all the channels that are xp muted',
	usage: `${config.prefix}xpmuted`,
	options: [],
	run: async (client, message, args) => {
		// command
		const numMuted = await mcSchema.countDocuments();
		const fields = [];
		const list = await mcSchema.find({});
		const PS = await client.guilds.fetch(config.PS);
		for(var i = 0;i < numMuted; i++) {
			const channel = await PS.channels.cache.get(list[i].channel);
			fields.push({ 'name': `#${i + 1}`, 'value': `${channel.toString()}` });
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('XP Muted Channels')
			.addFields(fields);
		return message.reply({ embeds: [embed] });
	},
};