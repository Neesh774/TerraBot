const { MessageEmbed } = require(`discord.js`);
const { GuildMember } = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "np",
    aliases: ["nowplaying", "fm"],
    category: "music",
    description: "Shows info about the playing song",
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

        const filters = [];

        if (!queue || !queue.playing) return interaction.followUp({
            content: "No songs currently playing"
        });

        const progress = queue.createProgressBar();

        const embed1 = new MessageEmbed()
            .setAuthor(`${queue.current.title}`, queue.current.thumbnail)
            .setColor(config.embedColor)
            .setImage(queue.current.thumbnail)
            .setTimestamp()
            .addFields({
                    name: "\u200b",
                    value: "```" + progress + "```"
                }, {
                    name: "Artist",
                    value: "```" + queue.current.author + "```"
                }, {
                    name: "Song Plays",
                    value: "```" + `${queue.current.views}` + "```"
                }

            )

        interaction.followUp({
            embeds: [embed1]
        });
    },
};
