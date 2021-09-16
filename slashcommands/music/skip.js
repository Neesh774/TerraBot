const Discord = require(`discord.js`);
const { GuildMember } = require("discord.js")
const config = require('../../config.json');

module.exports = {
    name: "skip",
    category: "music",
    description: "Skip to the current song",
    run: async (client, interaction, args) => {
        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.followUp({
                content: "You are not in a voice channel!",
                ephemeral: true
            });
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return void interaction.followUp({
                content: "You are not in my voice channel!",
                ephemeral: true
            });
        }

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({
            content: "No music is being played!"
        });

        const currentTrack = queue.current;
        const success = queue.skip();

        if(success){
        const embed = new Discord.MessageEmbed()
            .setAuthor(success ? `Skipped ${currentTrack}` : " Something went wrong!", client.user.avatarURL())
            .setColor(config.embedColor)
            .setFooter(interaction.user.username, interaction.user.avatarURL({
                dynamic: true
            }))
            .setTimestamp()

        return interaction.followUp({
            embeds: [embed]
        })
    }

    }
}
