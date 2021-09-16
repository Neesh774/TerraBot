const { GuildMember } = require("discord.js")
const config = require('../../config.json');

module.exports = {
    name: "queue",
    category: "music",
    description: "See the servers music queue",
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
            content: " No music is being played!"
        });

        const currentTrack = queue.current;

        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}**`;
        });

        return void interaction.followUp({
            embeds: [{
                title: "Queue",
                image: queue.current.thumbnail,
                description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}` : ""
                    }`,
                color: config.embedColor,
                fields: [{
                    name: "Now Playing",
                    value: `**${currentTrack.title}**`
                }],
                footer: interaction.user.username,
                image: queue.current.thumbnail
            }]
        });

    }
}
