const Discord = require(`discord.js`);
const { GuildMember } = require("discord.js")
const config = require('../../config.json');

module.exports = {
    name: "volume",
    category: "music",
    description: "Sets music volume",
    options: [{
        name: "amount",
        type: "INTEGER",
        description: "The volume amount to set (0-100)",
        required: false
    }],
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

        const vol = interaction.options.get("amount");
        
        if (!vol) return void interaction.followUp({
            content: ` Current volume is **${queue.volume}**%!`
        });

        if ((vol.value) < 0 || (vol.value) > 100) return void interaction.followUp({
            content: " Volume range must be 0-100"
        });

        const success = queue.setVolume(vol.value);

        const yes = new Discord.MessageEmbed()
            .setAuthor(success ? `Volume set to ${parseInt(args[0])}%!` : "Something went wrong!", client.user.avatarURL())
            .setTimestamp()
            .setFooter(interaction.user.username, interaction.user.avatarURL({
                dynamic: true
            }))
            .setColor(config.embedColor)

        return void interaction.followUp({
            embeds: [yes]
        });

    }
}
