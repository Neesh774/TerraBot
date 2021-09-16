const Discord = require(`discord.js`);
const { Player, QueryType, QueueRepeatMode } = require("discord-player");
const { GuildMember } = require("discord.js")

module.exports = {
    name: "loop",
    category: "music",
    description: "Sets loop mode",
    options: [{
        name: "mode",
        type: "INTEGER",
        description: "Loop type",
        required: true,
        choices: [{
                name: "Off",
                value: QueueRepeatMode.OFF
            },
            {
                name: "Track",
                value: QueueRepeatMode.TRACK
            },
            {
                name: "Queue",
                value: QueueRepeatMode.QUEUE
            },
            {
                name: "Autoplay",
                value: QueueRepeatMode.AUTOPLAY
            }
        ]
    }],
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

        const loopMode = interaction.options.get("mode").value;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";

        return void interaction.followUp({
            content: success ? `${mode} | Updated loop mode!` : " Could not update loop mode!"
        });

    }
}
