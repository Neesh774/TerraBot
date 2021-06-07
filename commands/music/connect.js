const { MessageEmbed } = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");

module.exports = {
  name: "connect",
  category: "Music", 
  description: "Beano will connect to your voice channel",
  usage: "connect",
  run: async (client, message) => {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(
        "You must Join a voice channel before using this command!"
      );

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
      return error("I don't have permission to join the voice channel");

    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
      return error("I don't have permission to speak in the voice channel");

    await channel.join();

    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Joined the voice channel :white_check_mark: **")
        .setColor(config.embedColor)
    );
  },
}
