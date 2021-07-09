const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports= {
  name: "loop",
  category: "music", 
  description: "TerraBot will loop the current song",
  usage: `${config.prefix}loop`,
  run:async (client, message) => {
  const queue = message.client.queue.get(message.guild.id);

  if (!queue)
    return message.reply(
      ":x: There are no songs playing in this server"
    );

  queue.loop = !queue.loop;
  message.reply(
    new MessageEmbed()
      .setColor(config.embedColor)
      .setTimestamp()
      .setDescription(
        "**Loop is" +
          (queue.loop == true ? " Enabled " : " Disabled ") +
        "for current song :white_check_mark: **"
      )
  );
},
}
