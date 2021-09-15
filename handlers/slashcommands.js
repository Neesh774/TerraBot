const { readdirSync } = require('fs');

const ascii = require('ascii-table');

const table = new ascii('Slash Commands');
table.setHeading('Slash Commands', 'Load status');


module.exports = (client) => {
	readdirSync('./slashcommands/').forEach(dir => {
		const commands = readdirSync(`./slashcommands/${dir}/`).filter(file => file.endsWith('.js'));

		for (const file of commands) {
			const pull = require(`../slashcommands/${dir}/${file}`);

			if (pull.name) {
				client.slashcommands.set(pull.name, pull);
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
};
