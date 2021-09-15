const Discord = require('discord.js');
const config = require('../../config.json');
const rrSchema = require('../../models/rrschema.js');
module.exports = {
	name: 'rrdel',
	category: 'Reaction Roles',
	description: 'Deletes a certain reaction role',
	usage: `${config.prefix}rrdel [reaction role ID]`,
	options: [
		{
			name: 'reaction_role_id',
			type: 'INTEGER',
			description: 'The ID of the reaction role you want to delete',
			required: false,
		},
	],
	run: async (client, interaction) => {
		// reaction role
		const numReactionRoles = await rrSchema.countDocuments({});
		if (interaction.options.getInteger('reaction_role_id')) {
			const fields = [];
			if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
				return interaction.editReply('You don\'t have permissions for that :/');
			}
			const id = interaction.options.getInteger('reaction_role_id');
			if (id > numReactionRoles) {
				return interaction.editReply('That reaction role doesn\'t exist!');
			}
			const reactionRole = await rrSchema.findOne({ id: id });
			await rrSchema.deleteOne({ id: id });
			for (let i = reactionRole.id + 1;i < numReactionRoles + 1; i++) {
				const nextRR = await rrSchema.findOne({ id:i });
				nextRR.id--;
				await nextRR.save();
			}
			interaction.editReply('Reaction role successfully deleted!');
			const PS = await client.guilds.fetch(config.PS);
			const logs = await PS.channels.cache.get(config.logs);
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle('Reaction Role Deleted')
				.setTimestamp()
				.setDescription('Reaction role was cleared by user ' + interaction.user.tag);
			return logs.send({ embeds: [embed] });
		}
		else {
			if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
				return interaction.editReply('You don\'t have permissions for that :/');
			}
			await rrSchema.deleteMany({});
			interaction.editReply('Reaction roles successfully cleared!');
			const PS = await client.guilds.fetch(config.PS);
			const logs = await PS.channels.cache.get(config.logs);
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle('Reaction Roles Cleared')
				.setTimestamp()
				.setDescription('Reaction roles were cleared by user ' + interaction.user.tag);
			return logs.send({ embeds: [embed] });
		}
	},
};