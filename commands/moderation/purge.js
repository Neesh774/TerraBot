const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'purge',
	category: 'moderation',
	description: 'Deletes messages in a text channel or specified number of messages in a text channel.',
	usage: `${config.prefix}purge <number of messages>`,
	run: async (client, message, args) => {
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);

		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You Don\'t Have Sufficient Permissions!- [MANAGE_MESSAGES]');
		if (isNaN(args[0])) {return message.channel.send('**Please Supply A Valid Amount To Delete Messages!**');}

		if (args[0] > 100) {return message.channel.send('**Please Supply A Number Less Than 100!**');}

		if (args[0] < 1) {return message.channel.send('**Please Supply A Number More Than 1!**');}
		const num = parseInt(args[0]);
		message.channel.bulkDelete(num + 1)
			.then(messages => message.channel.send(`**Succesfully deleted \`${messages.size}/${num + 1}\` messages**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null);
		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Purged Messages')
			.setDescription(`${message.author.username} purged ${num} messages in <#${message.channel.id}>`);

		logs.send(embed);
	},
};
