const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
  name: 'serverinfo',
  category: 'utility',
description: 'Shows info about a server',
usage: `${config.prefix}serverinfo`,
run: async (client, message, args) => {
// command
const servericon = message.guild.iconURL;
const owner = await message.guild.members.fetch(message.guild.ownerID);
const serverembed = new Discord.MessageEmbed()
.setTitle('Server Information')
.setColor(config.embedColor)
.setThumbnail(servericon)
.addField('Server Name', message.guild.name)
.addField('Owner', message.guild.owner.user.toString(), true)
.addField('Channels', message.guild.channels.cache.size, true)
.addField('Roles', message.guild.roles.cache.size, true)
.addField('Created On', message.guild.createdAt)
.addField('You Joined', message.member.joinedAt)
.addField('Total Members', message.guild.memberCount)
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL);
message.channel.send({ embeds: [serverembed] });
},
};