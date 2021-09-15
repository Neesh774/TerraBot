const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "volume",
  category: "music", 
  description: "TerraBot lets you change the volume",
  usage: `${config.prefix}volume <amount>`,
  run: async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.reply(
      "You must Join a voice channel before using this command!"
    );

  let queue = message.client.queue.get(message.guild.id);

  if (!args[0])
    return message.reply(
      new MessageEmbed()
        .setColor(config.embedColor)
        .setDescription("**Current volume is " + queue.volume + " **")
    );

  if (args[0] > 100)
    return message.reply(
      new MessageEmbed()
        .setColor(config.embedColor)
        .setDescription("**Volume cannot exceed 100 :x: **")
    );

  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  queue.volume = args[0];
  message.reply(
    new MessageEmbed()
      .setColor(config.embedColor)
      .setDescription("**Volume set to " + args[0] + " :white_check_mark: **")
  );
}
}