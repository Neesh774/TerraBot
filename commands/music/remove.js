const { MessageEmbed } = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");

module.exports ={
  name: "remove",
  category: "Music", 
  description: "Beano removes a song from the queue",
  usage: "remove <id>",
  run: async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "You must Join a voice channel before using this command!"
    );
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: No song number provided")
        .setColor(config.embedColor)
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Args must be number [Example: -remove 2]**")
        .setColor(config.embedColor)
    );
  let queue = message.client.queue.get(message.guild.id);
  if (args[0] == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Can't remove currently playing song, use command skip**"
        )
        .setColor(config.embedColor)
    );
  if (queue.queue.length == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Can't remove when only one song is playing, Use command stop**"
        )
        .setColor(config.embedColor)
    );
  if (args[0] > queue.queue.length)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **The queue doesn't have that much songs**")
        .setColor(config.embedColor)
    );
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **There are no songs playing in this server**")
        .setColor(config.embedColor)
    );
  var name = queue.queue[args[0] - 1].name;
  queue.queue.splice(args[0] - 1);
  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**Removed" + " " + name + " " + "from queue :white_check_mark: **"
      )
      .setTimestamp()
      .setColor(config.embedColor)
  );
}
}