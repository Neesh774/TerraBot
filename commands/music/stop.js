const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports ={
  name: "stop",
  category: "music", 
  description: "TerraBot stops the music",
  usage: `${config.prefix}stop`,
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
  queue.connection.dispatcher.end();
  queue.queue = [];
  return message.reply(
    new MessageEmbed()
      .setDescription("**Stopped the music :white_check_mark: **")
      .setColor(config.embedColor)
  );
}
}