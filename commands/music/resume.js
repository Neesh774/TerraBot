const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports ={
  name: "resume",
  category: "music", 
  description: "Beano resumes the music",
  usage: "resume",
  run: async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "You must Join a voice channel before using this command!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: There are no songs playing in this server")
        .setColor(config.embedColor)
    );
  if (queue.playing == true)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: The song is already playing")
        .setColor(config.embedColor)
    );
  queue.connection.dispatcher.resume();
  message.react("▶");
  queue.playing = true;
  return message.channel.send(
    new MessageEmbed()
    .setDescription("**Resumed the music :white_check_mark:**")
    .setColor(config.embedColor)
  );
}
}