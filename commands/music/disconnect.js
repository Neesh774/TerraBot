const { MessageEmbed } = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");

module.exports = {
  name: "disconnect",
  category: "Music", 
  description: "Beano will disconnect from your voice channel",
  usage: "connect",
  run: async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "You must Join a voice channel before using this command!"
    );

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Left the voice channel :white_check_mark: **")
      .setColor(config.embedColor)
  );
},
}
