const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "pause",
  category: "music", 
  description: "TerraBot pauses the music",
  usage: `${config.prefix}pause`,
  run: async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must Join a voice channel before using this command!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply(
      new MessageEmbed()
        .setDescription(":x: There are no songs playing in this server")
        .setColor(config.embedColor)
    );
  if (queue.playing == false)
    return message.reply(
      new MessageEmbed()
        .setDescription(":x: The song is already paused")
        .setColor(config.embedColor)
    );
  queue.connection.dispatcher.pause();
  queue.playing = false;
  return message.reply(
    new MessageEmbed()
    .setDescription("**Paused the music :white_check_mark: **")
    .setColor(config.embedColor)
  );
}
}
