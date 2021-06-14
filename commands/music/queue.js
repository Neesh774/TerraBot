const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "queue",
  category: "music", 
  description: "Beano tells you what's in the queue",
  usage: `${config.prefix}queue`,
  run: async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "You must Join a voice channel before using this command!"
    );
  const queue = message.client.queue.get(message.guild.id);
  var status;
  var np;
  var count = 0;
  if (!queue) status = "There is nothing in queue!";
  else
    status = queue.queue
      .map((x) => {
        count += 1;
        return (
          "• " +
          "`" +
          count +
          "." +
          "`" +
          x.name +
          " -Requested by " +
          `<@${x.requested.id}>`
        );
      })
      .join("\n");
  if (!queue) np = status;
  else np = queue.queue[0].name;
  if (queue) thumbnail = queue.queue[0].thumbnail;
  else thumbnail = message.guild.iconURL();
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Beano Music",
        "https://img.icons8.com/color/2x/rhombus-loader.gif"
      )
      .setThumbnail(thumbnail)
      .setColor(config.embedColor)
      .addField("Now Playing", np, true)
      .setDescription(status)
  );
}
}