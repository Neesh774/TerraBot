const Discord = require('discord.js');
const config = require('../../config.json');
const rrSchema = require('../../models/rrschema.js');
module.exports = {
	name: 'rr',
	category: 'Reaction Roles',
	description: 'Creates a reaction role on the given interaction with the given emote',
	usage: `${config.prefix}rr <Channel ID> <interaction ID> <Role ID> <Reaction Emote>`,
	options: [
		{
			name: 'channel',
			type: 'CHANNEL',
			description: 'The channel you want to put the reaction role in',
			required: true,
		},
		{
			name: 'message_id',
			type: 'STRING',
			description: 'The id of the message you want to put the reaction role on',
			required: true,
		},
		{
			name: 'role',
			type: 'ROLE',
			description: 'The role you want users to get',
			required: true,
		},
		{
			name: 'emoji',
			type: 'STRING',
			description: 'The emoji you want the reaction role to show up as on the interaction',
			required: true,
		},
	],
	run: async (client, interaction) => {
		try {
			const channel = interaction.options.getChannel('channel');
			if (!channel || channel.type != 'GUILD_TEXT') return interaction.channel.reply({ content: ':x: | **Channel Invalid**' });
			const channelid = channel.id;
			const msg = await channel.messages.fetch(interaction.options.getString('message_id'));
			if (!msg) return interaction.editReply(':x: | **interaction Not Found**');
			const mes = msg.id;
			let role = interaction.options.getRole('role');
			role = role.id;
			const embed = new Discord.MessageEmbed()
				.setTitle('Success!')
				.setDescription('Reaction role spawned successfully')
				.setColor(config.embedColor);
			let emoji;
			const reaction = interaction.options.getString('emoji');
			await msg.react(reaction).then(() => {
				emoji = reaction;
				interaction.editReply({ embeds: [embed] });
			}).catch(err => interaction.editReply('Invalid emoji. I must have access to the emoji.').then(m => setTimeout(async () => {await m.delete();}, 7500)));
			const numRRs = await rrSchema.countDocuments({}) + 1;
			if (emoji.includes(':')) emoji = emoji.replace('<:', '').slice(emoji.replace('<:', '').indexOf(':') + 1, emoji.replace('<:', '').length - 1);
			const rr = new rrSchema({
				id: numRRs,
				messageID: mes,
				channelID: channelid,
				roleID: role,
				reactionID: emoji,
			});
			await rr.save();
		}
		catch (e) {
			return interaction.editReply({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });
		}
	},
};
