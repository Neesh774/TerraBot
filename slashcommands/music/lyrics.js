const { MessageEmbed } = require(`discord.js`);
const lyricsFinder = require("lyrics-finder")
const { PagesBuilder } = require('discord.js-pages');
const config = require('../../config.json');

module.exports = {
    name: "lyrics",
    description: "Provides lyrics",
    category: "music",
    options: [{
        name: "song",
        type: "STRING",
        description: "Song title",
        required: true
    }],
    run: async (client, interaction, args) => {
        const queue = client.player.getQueue(interaction.guildId);

        const search = interaction.options.get("song").value || queue.current.title,
        lyrics = await lyricsFinder(search),
        lyricsIndex = Math.round(lyrics.length / 4096) + 1,
        lyricsArray = new Array;

        if(!lyrics) return interaction.followUp({ content: "I can't find the lyrics :(" })

    for (let i = 1; i <= lyricsIndex; ++i) {
        let b = i - 1;
        if (lyrics.trim().slice(b * 4096, i * 4096).length !== 0) {
            lyricsArray.push(
                new MessageEmbed()
                .setTitle(`Lyrics page #` + i)
                .setDescription(lyrics.slice(b * 4096, i * 4096))
            );
        }
    }

    new PagesBuilder(interaction)
        .setPages(lyricsArray)
        .setColor(config.embedColor)
        .build();
	}
}
