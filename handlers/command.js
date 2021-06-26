const { readdirSync } = require('fs');

const ascii = require('ascii-table');

const table = new ascii('Commands');
table.setHeading('Command', 'Load status');

console.log('Welcome to [ TerraBot ] // Discord: 🧀♅ツNeeshツ♅🧀#7740');

// Loads Discord economy module

module.exports = (client) => {
	readdirSync('./commands/').forEach(dir => {
		const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

		for (const file of commands) {
			const pull = require(`../commands/${dir}/${file}`);

			if (pull.name) {
				client.commands.set(pull.name, pull);
				table.addRow(file, 'Ready');
			}
			else {
				table.addRow(file, 'error -> missing a help.name, or help.name is not a string.');
				continue;
			}

			if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
		}
	});
	console.log(table.toString());
	console.log('Welcome to [ TerraBotBot ] // Discord: 🧀♅ツNeeshツ♅🧀#7740');

	console.log('Logging into Bot User...');

};
