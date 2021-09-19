const Discord = require('discord.js');
const config = require('../config.json');
const button = require('./button');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isCommand()) {
			let command = client.slashcommands.get(interaction.commandName);
			if (!command) command = client.slashcommands.get(client.aliases.get(interaction.commandName));
			if (command) {
				await interaction.deferReply({ ephemeral: command.ephemeral });
				command.run(client, interaction).catch(async (e) => {
					console.log(e);
					await client.users.fetch(config.neesh).then(user => {user.send(`\`\`\`${e.stack}\`\`\``);});
					return interaction.editReply('There was an error. Please try that again later.');
				});
			}
		}
		if (interaction.isButton()) {
			button.execute(interaction, client);
		}
	},
};