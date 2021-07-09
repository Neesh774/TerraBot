const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const config = require("../../config.json");

module.exports ={
  name: "lyrics",
  category: "music", 
  description: "TerraBot finds the lyrics for the currently playing song",
  usage: `${config.prefix}lyrics`,
  run: async (client, message, args) => {
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel
      .send("There is nothing playing.")
      .catch(console.error);

  let lyrics = null;

  try {
    lyrics = await lyricsFinder(queue.queue[0].name, "");
    if (!lyrics) lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
  } catch (error) {
    lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setDescription(lyrics)
    .setColor(config.embedColor)
    .setTimestamp();

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.reply(lyricsEmbed).catch(console.error);
}
}
