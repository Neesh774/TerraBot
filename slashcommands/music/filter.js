
const { GuildMember } = require("discord.js");
const { Message, ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "filter",
    description: "Play a filter 😳",
    category: "music",
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

        const don = new MessageEmbed()
        .setAuthor("Music Filters!", client.user.avatarURL())
        .setDescription("**Press one of the following buttons to select a filter!**")
        .setColor(config.embedColor)
        .setTimestamp()
        .setFooter(interaction.user.username, interaction.user.avatarURL({dynamic:true}))

        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("bassboostbtn")
            .setLabel("Bassboost 🔊")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setCustomId("distortbtn")
            .setLabel("Distort 🔊")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setCustomId("flangerbtn")
            .setLabel("Flanger 🔊")
            .setStyle("PRIMARY"),
        )


    interaction.followUp({
            embeds: [don],
            components: [row]
    })
    }
}
