const Discord = require('discord.js');
const mSchema = require('../../models/memberschema');
const config = require('../../config.json');

module.exports = {
	name: 'sblb',
	category: 'Starboards',
	description: 'Gives you a list of who has the most starboards',
	usage: `${config.prefix}sblb [page]`,
	options: [
		{
			name: 'page',
			type: 'INTEGER',
			description: 'The page of the starboard leaderboard to check',
			required: false,
		},
	],
	run: async (client, interaction) => {
		// ordering list
		let list = await mSchema.find({});
		if (!list[0]) return interaction.editReply('Looks like we don\'t have any starboards yet :/');
		list.sort(function(a, b) {
			return b.starboards - a.starboards;
		});
		list = list.filter(member => member.starboards > 0);
		// variables
		const numPages = Math.ceil(list.length / 10);
		const PS = await client.guilds.fetch(config.PS);
		const fields = [];
		let start = 0;
		const end = list.length < 10 ? list.length : 10;
		const page = interaction.options.getString('page') ?? 1;
		// logic
		if (page > numPages || page < 0) return interaction.editReply('We don\'t seem to have that many users with starboards yet.');
		start = 10 * (page - 1);
		for (let i = start; i < end; i++) {
			fields.push({ 'name': `#${i + 1} | ${list[i].name}`, 'value': `${list[i].starboards} starboards` });
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle(`Starboards [${page}/${numPages}]`)
			.addFields(fields)
			.setAuthor('TerraBot Starboard Leaderboard', PS.iconURL());
		return interaction.editReply({ embeds: [embed] });
	},
};