const Discord = require('discord.js');
const config = require('../../config.json');
const ccSchema = require('../../models/ccschema.js');
module.exports = {
	name: 'ccdel',
	category: 'Custom Commands and Auto Reponses',
	description: 'Delete a certain custom command',
	usage: `${config.prefix}ccdel [command ID]`,
	run: async (client, message, args) => {
		// command
		const numCommands = await ccSchema.countDocuments({});
		const fields = [];
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		if(args[0] > numCommands) {
			return message.reply('That command doesn\'t exist!');
		}
		const command = await ccSchema.findOne({ id: args[0] });
		await ccSchema.deleteOne({ id: args[0] });
		for(let i = command.id + 1;i < numCommands + 1; i++) {
			const nextCommand = await ccSchema.findOne({ id:i });
			nextCommand.id--;
			await nextCommand.save();
		}
		message.reply(`Command with trigger ${command.trigger} successfully deleted!`);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Command Deleted')
			.setTimestamp()
			.setDescription(`Command with trigger ${command.trigger} was cleared by user ` + message.author.tag);
		return logs.send(embed);
	},
};