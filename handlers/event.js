const { readdirSync } = require('fs');

const ascii = require('ascii-table');
const table = new ascii('Events');
table.setHeading('Event', 'Load status', 'Type');

module.exports = (client) => {
	readdirSync('./events/').forEach(file => {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        table.addRow(file, 'Ready', event.once ? 'Once' : 'On');
	});
	console.log(table.toString());
    console.log('Welcome to [ TerraBot ] // Discord: 🧀♅ツNeeshツ♅🧀#7740');

	console.log('Logging into Bot User...');
};
