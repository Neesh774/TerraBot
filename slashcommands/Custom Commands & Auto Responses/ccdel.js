const Discord = require('discord.js');
const config = require('../../config.json');
const ccSchema = require('../../models/ccschema.js');
module.exports = {
	name: 'ccdel',
	category: 'Custom Commands and Auto Reponses',
	description: 'Delete a certain custom command',
	usage: `${config.prefix}ccdel <command ID>`,
	options: [
		{
			name: 'command_id',
			type: 'INTEGER',
			description: 'The ID of the command you want to delete',
			required: true,
		},
	],
	run: async (client, interaction) => {
		// command
		const numCommands = await ccSchema.countDocuments({});
		const fields = [];
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.editReply('You don\'t have permissions for that :/');
		}
		const commandid = interaction.options.getInteger('command_id');
		if (commandid > numCommands) {
			return interaction.editReply('That command doesn\'t exist!');
		}
		const command = await ccSchema.findOne({ id: commandid });
		await ccSchema.deleteOne({ id: command });
		for (let i = command.id + 1;i < numCommands + 1; i++) {
			const nextCommand = await ccSchema.findOne({ id:i });
			nextCommand.id--;
			await nextCommand.save();
		}
		interaction.editReply(`Command with trigger ${command.trigger} successfully deleted!`);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Command Deleted')
			.setTimestamp()
			.setDescription(`Command with trigger ${command.trigger} was cleared by user ` + interaction.user.tag);
		return logs.send({ embeds: [embed] });
	},
};