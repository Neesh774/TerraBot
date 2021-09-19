const { GuildMember, MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'skipto',
    description: 'Skips to a certain track in the queue',
    category: 'music',
    options: [
        {
            name: 'skipto',
            type: 'INTEGER',
            description: 'The number of tracks to skip',
        },
    ],
    run: async (client, interaction, args) => {
        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.followUp({
				content: 'You are not in a voice channel!', ephemeral:true,
            });
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return void interaction.followUp({
				content: 'You are not in my voice channel!', ephemeral:true,
            });
        }

        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | No music is being played!' });

        const tracksCount = interaction.options.tracks;
        queue.jump(tracksCount);

        interaction.followUp({ content: `⏭ | Skipped ${tracksCount} tracks` });
    },
};
