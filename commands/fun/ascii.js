const figlet = require('figlet');
const utils = require('../../utils');
const config = require('../../config.json');

module.exports = {
	name: 'ascii',
	category: 'fun',
	description: 'Converts text info ASCII',
	usage: `${config.prefix}ascii <text>`,
	run: async (client, message, args) => {
		// command
		const maxLen = 100;

		if(args.join(' ').length > maxLen) return message.channel.send(`The max length is ${maxLen}!`);

		if(!args[0]) return message.channel.send('Please enter some text.');

		figlet(`${args.join(' ')}`, function(err, data) {
			if (err) {
				console.dir(err);
				return;
			}

			message.channel.send(`${data}`, { code: 'AsciiArt' });
		});
	},
};