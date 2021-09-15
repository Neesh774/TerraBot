const Discord = require('discord.js');
const sbSchema = require('../../models/starboard.js');
const config = require('../../config.json');

module.exports = {
	name: 'serverstarboards',
	category: 'Starboards',
	description: 'Gives you a list of all the server\'s starboards',
	usage: `${config.prefix}starboards [page]`,
	options: [
		{
			name: 'page',
			type: 'INTEGER',
			description: 'The page of the starboards to check',
			required: false,
		},
	],
	run: async (client, interaction) => {
		// command
		const sbs = await sbSchema.find();
		let numPages = Math.ceil(sbs.length / 10);
		const PS = await client.guilds.fetch(config.PS);
		const fields = [];
		let start = 0;
		let end = 10;
		if (sbs.length < 10) {
			end = sbs.length;
		}
		const page = interaction.options.getInteger('page');
		if (page) {
			if (page > numPages || page < 0) {
				return interaction.editReply('We don\'t seem to have that many starboards yet.');
			}
			let numEntries = 10;
			if (page == numPages) {
				numEntries = sbs.length - 10 * (numPages - 1);
			}
			start = 10 * (page - 1);
			end = numEntries + start;
			for (let i = start; i < end; i++) {
				const channel = await PS.channels.cache.get(sbs[i].channelID);
				const msg = await channel.messages.fetch(sbs[i].messageID);
				fields.push({ 'name': `#${i + 1} | ${sbs[i].author}`, 'value': `[Jump!](${msg.url})` });
			}
		}
		else {
			// eslint-disable-next-line no-redeclare
			for (let i = start; i < end; i++) {
				const channel = await PS.channels.cache.get(sbs[i].channelID);
				const msg = await channel.messages.fetch(sbs[i].messageID);
				fields.push({ 'name': `#${i + 1} | ${sbs[i].author}`, 'value': `[Jump!](${msg.url})` });
			}
		}
		if (numPages == 0) {
			numPages = 1;
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle(`Starboards [${page}/${numPages}]`)
			.addFields(fields)
			.setAuthor('TerraBot Starboard Leaderboard', PS.iconURL());
		return interaction.editReply({ embeds: [embed] });
	},
};