const figlet = require('figlet');
const config = require('../../config.json');

module.exports = {
	name: 'ascii',
	category: 'fun',
	description: 'Converts text info ASCII',
	usage: `${config.prefix}ascii <text>`,
	options: [
		{
			name: 'text',
			type: 'STRING',
			description: 'The text you want to ascii-ify.',
			required: true,
		},
	],
	run: async (client, interaction) => {
		// command
		const maxLen = 100;
		const text = interaction.options.getString('text');
		if (text.length() > maxLen) return interaction.editReply({ content: `The max length is ${maxLen}!` });

		figlet(text, function(err, data) {
			if (err) {
				console.dir(err);
				return;
			}

			interaction.editReply({ content: `\`\`\`${data}\`\`\`` });
		});
	},
};