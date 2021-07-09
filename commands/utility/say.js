const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'say',
	category: 'utility',
	description: 'TerraBot will repeat you.',
	usage: `${config.prefix}say <text>`,
	run: async (client, message, args) => {
		// command
		if(!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that.');
		}
		if(!args[0]) {
			return message.reply('You need to give me something to say!');
		}
		message.delete().then(msg =>{
			return msg.channel.send(args.join(' '));
		});
	},
};