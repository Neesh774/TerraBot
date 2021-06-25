const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports= {
  name: "np",
  category: "music", 
  description: "TerraBot tells you what's currently playing",
  usage: `${config.prefix}np`,
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
        .setColor(config.embedColor)
        .setDescription(":x: There are no songs playing in this server")
    );
  message.reply(
    new MessageEmbed()
      .setColor(config.embedColor)
      .setDescription(
        queue.queue[0].name +
          " Requested By: " +
          "<@" +
          queue.queue[0].requested +
          ">"
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter("There are " + queue.queue.length + " songs in queue")
  );
}
}
