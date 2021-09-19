const { GuildMember, MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'playnext',
    description: 'Adds a song to the top of the queue',
    category: 'music',
    options: [
        {
            name: 'query',
            type: 'STRING',
            description: 'The song you want to play next',
            required: true,
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

        const query = interaction.options.query;
        const searchResult = await client.player
            .search(query, {
                requestedBy: interaction.user,
            })
            .catch(() => null);

        if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: 'No results were found!' });
        queue.insert(searchResult.tracks[0]);
    },
};
