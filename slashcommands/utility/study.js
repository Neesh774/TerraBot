const ms = require('ms');
const config = require('../../config.json');

module.exports = {
	name: 'study',
	description: 'TerraBot will isolate you so you can study in peace.',
	usage: `${config.prefix}study <time>`,
	options: [
		{
			name: 'time',
			type: 'STRING',
			description: 'The time that you\'ll be studying',
			required: true,
		},
	],
	run: async (client, interaction) => {
		const time = interaction.options.getString('time');
		interaction.editReply(`Alright, I'm going to let you study for ${time}. Make me proud, ok?`);
		const member = interaction.member;
		member.roles.remove(config.cafeGuest);
		setTimeout(() => {
			interaction.member.roles.remove(config.cafeGuest);
			member.send(`${member.user.toString()}, did you study well?`);
		}, ms(time));
	},
};