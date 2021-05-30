const Discord = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
module.exports = {
  name: "serverinfo",
  category: "utility",
description: "Shows info about a server",
usage: "[command]",
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let owner = await message.guild.fetch(message.guild.ownerID);
let serverembed = new Discord.MessageEmbed()
.setTitle("Server Information")
.setColor(config.embedColor)
.setThumbnail(servericon)
.addField("Server Name", message.guild.name)
.addField("Owner", `moni#0420`, true)
.addField("Channels", message.guild.channels.cache.size, true)
.addField("Roles", message.guild.roles.cache.size, true)
.addField("Created On", message.guild.createdAt)
.addField("You Joined", message.member.joinedAt)
.addField("Total Members", message.guild.memberCount)
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL);
message.channel.send(serverembed);
}
};