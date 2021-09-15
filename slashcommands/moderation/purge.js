const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'purge',
	category: 'moderation',
	description: 'Deletes messages in a text channel or specified number of messages in a text channel.',
	usage: `${config.prefix}purge <number of messages>`,
	options: [
		{
			name: 'num_messages',
			type: 'INTEGER',
			description: 'The number of messages to delete',
			required: true,
		},
	],
	moderation: true,
	run: async (client, interaction) => {
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);

		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.editReply({ content: 'You Don\'t Have Sufficient Permissions!- [MANAGE_MESSAGES]' });
		const val = interaction.options.get('num_messages');
		if (val > 99) {
			return interaction.editReply({ content: 'Please Supply A Number Less Than 100!' });
		}

		if (val < 1) {return interaction.editReply({ content:'Please Supply A Number More Than 1!' });}
		const num = parseInt(val);
		interaction.channel.bulkDelete(num + 1)
			.then(messages => interaction.editReply({ content: `Succesfully deleted \`${messages.size}/${num + 1}\` messages` }).then(msg => msg.delete({ timeout: 5000 }))).catch(() => {return interaction.editReply({ content: 'I Couldn\'t Delete The Messages!' });});
		const embed = new MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Purged Messages')
			.setDescription(`${interaction.user.username} purged ${num} messages in <#${interaction.channel.id}>`);

		logs.send({ embeds: [embed] });
	},
};
