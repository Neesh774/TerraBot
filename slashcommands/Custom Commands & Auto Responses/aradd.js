const Discord = require('discord.js');
const config = require('../../config.json');
const arSchema = require('../../models/arschema.js');
module.exports = {
	name: 'aradd',
	category: 'Custom Commands and Auto Reponses',
	description: 'Creates a new auto responder',
	usage: `${config.prefix}aradd <trigger> <response> [another response] [another response]...`,
	options: [{
		name: 'trigger',
		type: 'STRING',
		description: 'The phrase that will trigger this auto response',
		required: true,
	},
	{
		name: 'response1',
		type: 'STRING',
		description: 'The phrase that will be sent back to the user',
		required: true,
	},
	{
		name: 'response2',
		type: 'STRING',
		description: 'The phrase that will be sent back to the user',
		required: false,
	},
	{
		name: 'response3',
		type: 'STRING',
		description: 'The phrase that will be sent back to the user',
		required: false,
	},
	{
		name: 'response4',
		type: 'STRING',
		description: 'The phrase that will be sent back to the user',
		required: false,
	},
	{
		name: 'response5',
		type: 'STRING',
		description: 'The phrase that will be sent back to the user',
		required: false,
	}],
	run: async (client, message, args) => {
		// command
		const numResponders = await arSchema.countDocuments({});
		if(!message.member.permissions.has('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		if(!args[0]) {
			return message.reply('You need to give me a trigger!');
		}
		if(!args[1]) {
			return message.reply('You need to give me atleast one response!');
		}
		const trigger = args[0];
		args.splice(0, 1);
		const responses = args;
		const ar = new arSchema({
			id: numResponders + 1,
			trigger: trigger,
			responsesArray: responses,
			created: message.createdAt.toUTCString(),
			createdByID: message.author.id,
		});
		ar.save().catch(err => console.log(err));
		const fields = [];
		for(var i = 0;i < responses.length;i++) {
			fields.push({ 'name':`Response #${i + 1}`, 'value': responses[i] });
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTimestamp()
			.setTitle('Auto Response Created')
			.setDescription(`An auto responder was created by ${message.author.tag}`)
			.addField('Trigger', trigger)
			.addFields(fields);
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		logs.send({ embeds: [embed] });
		return message.reply({ embeds: [embed] });
	},
};