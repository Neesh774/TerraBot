const ms = require('ms');
const functions = require('../../functions.js');
const config = require('../../config.json');

module.exports = {
	name: 'remindme',
	description: 'Set a reminder',
	args: true,
	usage: `${config.prefix}remindme <time> <reminder>`,
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.reply('When should I remind you?');
		}
		if(!args[1]) {
			return message.reply('What should I remind you with?');
		}
		const timeArg = args.shift();
		functions.setReminder(message, timeArg, args.join(' '));
	},
};