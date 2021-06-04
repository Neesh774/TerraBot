const Discord = require("discord.js")

module.exports = {
    name: "sblb",
    category: "utility",
  description: "Sends the starboard leaderboard",
  usage: "sblb",
  run: async (client, message, args) => {
  //command
    const starboard = client.starboardsManager.starboards.find(s => s.guildID === message.guild.id)
    if(!starboard) return message.channel.send('No starboard found.');
    
    const lb = await starboard.leaderboard();
    const content = lb.map((m, i) => `**${i+1}.**     ${m.stars} ⭐  -  ${m.embeds[0].description || `[Image](${m.embeds[0].image.url})`}`);
    const leaderboard = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s starboard`)
        .setDescription(content.join('\n'))
    
    message.channel.send(leaderboard);
  }
  };