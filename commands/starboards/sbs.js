const Discord = require("discord.js")
const mSchema = require("C:/Users/kkanc/Beano/models/memberschema.js");
const sbSchema = require("C:/Users/kkanc/Beano/models/starboard.js");
const config = require("C:/Users/kkanc/Beano/config.json");

module.exports = {
  name: "sbs",
  category: "Starboards",
  description: "Tells you how many starboards you have, or how many someone else has",
  usage: "sbs [user]",
  run: async (client, message, args) => {
    let member = await mSchema.findOne({userID: message.author.id});
    let user = message.author;
    if(args[0]){
        user = message.mentions.members.first().user || message.guild.members.cache.fetch(args[0]);
        if (!user) return message.channel.send(`:x: | **User Not Found**`);
        member = await mSchema.findOne({userID: user.id});
    }
    let embed = new Discord.MessageEmbed() 
        .setColor(config.embedColor)
        .setTitle(`${message.author.username}'s starboards`)
        .setAuthor("Beano Starboards", message.author.avatarURL());
    if(member.starboards > 0){
        let fields = [];
        const starboards = await sbSchema.find({authorID: user.id});
        const AC = await client.guilds.fetch(config.AC); 
        for(var i = 0; i < starboards.length; i ++){
            const channel = await AC.channels.cache.get(starboards[i].channelID);
            const msg = await channel.messages.fetch(starboards[i].messageID);
            fields.push({"name": `#${i +1}`, "value": `[Jump!](${msg.url})`})
        }
        embed.addFields(fields);
    }
    return message.channel.send(embed);
  }
};