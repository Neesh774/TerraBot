const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: "serverinfo",
  category: "utility",
<<<<<<< HEAD
description: "Shows info about a server",
usage: `${config.prefix}serverinfo`,
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let owner = await message.guild.members.fetch(message.guild.ownerID);
let serverembed = new Discord.MessageEmbed()
.setTitle("Server Information")
.setColor(config.embedColor)
.setThumbnail(servericon)
.addField("Server Name", message.guild.name)
.addField("Owner", message.guild.owner.user.toString(), true)
.addField("Channels", message.guild.channels.cache.size, true)
.addField("Roles", message.guild.roles.cache.size, true)
.addField("Created On", message.guild.createdAt)
.addField("You Joined", message.member.joinedAt)
.addField("Total Members", message.guild.memberCount)
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setTimestamp()
.setFooter(message.user.username, message.user.avatarURL);
message.reply({embeds: [serverembed]});
}
=======
  description: "Shows info about a server",
  usage: `${config.prefix}serverinfo`,
  options: [],
  run: async (client, message, args) => {
    //command
    let servericon = message.guild.iconURL;
    let owner = await message.guild.members.fetch(message.guild.ownerID);
    let serverembed = new Discord.MessageEmbed()
    .setTitle("Server Information")
    .setColor(config.embedColor)
    .setThumbnail(servericon)
    .addField("Server Name", message.guild.name)
    .addField("Owner", message.guild.owner.user.toString(), true)
    .addField("Channels", message.guild.channels.cache.size, true)
    .addField("Roles", message.guild.roles.cache.size, true)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL);
    message.channel.send({embeds: [serverembed]});
  }
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
};