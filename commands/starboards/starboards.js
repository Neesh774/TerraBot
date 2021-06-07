const Discord = require("discord.js")
const sbSchema = require("../../models/starboard.js");
const config = require("../../config.json");

module.exports = {
  name: "starboards",
  category: "Starboards",
  description: "Gives you a list of all the server's starboards",
  usage: "starboards [page]",
  run: async (client, message, args) => {
  //command
    const sbs = await sbSchema.find();
    let numPages = Math.ceil(sbs.length / 10);
    const AC = await client.guilds.fetch(config.AC); 
    let fields = [];
    let start = 0;
    let end = 10;
    let page = 1;
    if(sbs.length < 10){
      end = sbs.length;
    }
    if(args[0]){
      if(args[0] > numPages || args[0] < 0){
        return message.reply("We don't seem to have that many starboards yet.");
      }
      let numEntries = 10;
      if(args[0] == numPages){
        numEntries = sbs.length - 10*(numPages - 1);  
      }
      start = 10 * (args[0] - 1);
      end = numEntries + start;
      page = args[0];
      for(var i = start; i < end; i ++){
        const channel = await AC.channels.cache.get(sbs[i].channelID);
        const message = await channel.messages.fetch(sbs[i].messageID);
        fields.push({"name": `#${i+1} | ${sbs[i].author}`, "value": `[Jump!](${message.url})`})
      }
    }
    else{
      for(var i = start; i < end; i ++){
        const channel = await AC.channels.cache.get(sbs[i].channelID);
        const message = await channel.messages.fetch(sbs[i].messageID);
        fields.push({"name": `#${i+1} | ${sbs[i].author}`, "value": `[Jump!](${message.url})`})
      }
    }
    let embed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
      .setTitle(`Starboards [${page}/${numPages}]`)
      .addFields(fields)
      .setAuthor("Beano Starboard Leaderboard", AC.iconURL());
    return message.channel.send(embed);
  }
};