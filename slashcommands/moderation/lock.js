const config = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
    name: 'lock',
    category: 'moderation',
    description: 'Locks the current channel and prevents anyone from sending messages',
    usage: `${config.prefix}lock`,
    options: [],
	moderation: true,
    run: async (client, interaction) => {
        if (!message.channel.permissionsFor(message.member).has('BAN_MEMBERS')) return interaction.editReply('You don\'t have permissions for that :/');
        if (client.lockedChannels.has(message.channel.id)) {
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: true,
            },
            {
                reason: `Unlock by ${message.user.username}`,
            });
            client.lockedChannels.delete(message.channel.id);
            console.log(client.lockedChannels);
            const lockEmbed = new Discord.MessageEmbed()
                .setDescription(`Successfully unlocked ${message.channel.name}`)
                .setColor(config.embedColor);
            return interaction.editReply({ embeds: [lockEmbed] });
        }
        else {
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
            },
            {
                reason: `Lock by ${message.user.username}`,
            });
            client.lockedChannels.add(message.channel.id);
            console.log(client.lockedChannels);
            const unlockEmbed = new Discord.MessageEmbed()
                .setDescription(`Successfully locked ${message.channel.name}`)
                .setColor(config.embedColor);
            return interaction.editReply({ embeds: [unlockEmbed] });
        }
    },
};