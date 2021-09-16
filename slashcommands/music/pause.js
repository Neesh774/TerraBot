const Discord = require(`discord.js`);
const { GuildMember, Message, ButtonInteraction , MessageActionRow, MessageEmbed, MessageButton} = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "pause",
    category: "music",
    description: "Pauses the music",
    run: async (client, interaction, args) => {
        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.followUp({
                content: "You are not in a voice channel!"
            });
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return void interaction.followUp({
                content: "You are not in my voice channel!"
            });
        }
        
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return void interaction.followUp({
            content: " No music is being played!"
        });

        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("pause")
            .setLabel("Pause")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setCustomId("resume")
            .setLabel("Resume")
            .setStyle("PRIMARY")
        )

        const don = new MessageEmbed()
            .setAuthor("Click the buttons to either Pause or Resume!", client.user.avatarURL())
            .setColor(config.embedColor)
            .setTimestamp()
            .setFooter(interaction.user.username, interaction.user.avatarURL({
                dynamic: true
            }))

        interaction.followUp({
            embeds: [don],
            components: [row]
        }).then(m => setTimeout(() => m.delete(), 15000))

    }
}
