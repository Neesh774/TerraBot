const { GuildMember, MessageEmbed } = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "disconnect",
    description: "Disconnects bot from Voice Channel",
    category: "music",
    run: async (client, interaction, args) => {
        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.followUp({
				content: "You are not in a voice channel!",ephemeral:true
            });
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return void interaction.followUp({
				content: "You are not in my voice channel!",ephemeral:true
            });
        }

        const queue = client.player.getQueue(interaction.guildId);

        queue.destroy(true)

        const embed = new MessageEmbed()
        .setTitle("Goodbye! 👋")
        .setColor(config.embedColor)

        interaction.followUp({ embeds: [embed] })
    }
}
