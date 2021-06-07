const { MessageEmbed } = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");

module.exports = {
  name: "skipto",
  category: "Music", 
  description: "Beano skips to a certain song",
  usage: "skipto <id>",
  run: async (client, message, args) => {
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
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**You must specify the number to skip** :x:")
        .setColor(config.embedColor)
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Value must be a number** :x:")
        .setColor(config.embedColor)
    );
  queue.playing = !false;

  if (queue.loop) {
    for (let i = 0; i < parseInt(args[0]) - (1 + 1); i++) {
      var delta = queue.queue.shift();
      queue.queue.push(delta);
    }
  } else {
    queue.queue = queue.queue.slice(parseInt(args[0]) - (1 + 1));
  }

  try {
    queue.connection.dispatcher.end();
  } catch (e) {
    console.log(e);
    message.client.queue.delete(message.guild.id);
    queue.vc.leave();
  }

  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**Skipped the music to" +
          " `" +
          args[0] +
          "` " +
          ":white_check_mark:**"
      )
      .setColor(config.embedColor)
  );
}
}