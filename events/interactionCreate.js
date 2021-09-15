const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isCommand()) {
			let command = client.slashcommands.get(interaction.commandName);
			if (!command) command = client.slashcommands.get(client.aliases.get(interaction.commandName));
			const args = [];
			try {
				if (command.options) {
					command.options.forEach(option => {
						const value = interaction.options.get(option.name);
						if (value) {
							args.push(value.value.toString());
						}
					});
				}
			}
			catch (e) {
				console.log(e);
				interaction.reply('There was an error. Please try that again later.');
			}
			if (command) {
				await interaction.deferReply({ ephemeral: command.ephemeral });
				command.run(client, interaction, args).catch(async (e) => {
					console.log(e);
					await client.users.fetch(config.neesh).then(user => {user.send(e);});
					interaction.editReply('There was an error. Please try that again later.');
				});
			}
		}
	},
};