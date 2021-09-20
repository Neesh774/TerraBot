const config = require('../../config.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'ticketconfig',
	category: 'moderation',
	description: 'Beano sends a message to create tickets',
	usage: `${config.prefix}ticketconfig`,
	options: [],
	moderation: true,
    ephemeral: true,
	run: async (client, interaction) => {
		const embed = new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Create a Ticket')
            .setDescription('Press the button below to create a ticket and contact staff.')
            .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }));
        const button = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('ticketcreate')
                .setLabel('Create')
                .setStyle('PRIMARY'),
        );
        interaction.channel.send({ embeds: [embed], components: [button] });
        interaction.editReply('Successfully sent the create ticket embed!');
	},
};