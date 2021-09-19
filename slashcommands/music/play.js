const { GuildMember, MessageEmbed } = require('discord.js');
const { Player, QueryType, QueueRepeatMode, SPOTIFY_SONG } = require('discord-player');
const DiscordYTDLCore = require('discord-ytdl-core');
const config = require('../../config.json');

module.exports = {
    name: 'play',
    description: 'Plays a song from youtube',
    category: 'music',
    options: [{
        name: 'query',
        type: 'STRING',
        description: 'The song you want to play',
        required: true,
    }],
    run: async (client, interaction, args, player) => {
        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return interaction.followUp({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return void interaction.followUp({
                content: 'You are not in my voice channel!',
                ephemeral: true,
            });
        }

        const query = interaction.options.get('query').value;

        const searchResult = await client.player
            .search(query, {
                requestedBy: interaction.user,
            })
            .catch(() => null);

        if (!searchResult || !searchResult.tracks.length) {
return void interaction.followUp({
            content: 'No results were found!',
        });
}

        const queue = await client.player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        }
 catch {
             client.player.deleteQueue(interaction.guildId);
            return void interaction.followUp({
                content: 'Could not join your voice channel!',
            });
        }

        await interaction.followUp({
            content: `Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
        });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
        await interaction.editReply({
            content: `▶ Loaded! Now playing ${searchResult.tracks[0].title}`,
        });
    },
};
