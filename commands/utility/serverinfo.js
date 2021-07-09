const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
  name: 'serverinfo',
  category: 'utility',
  description: 'Shows info about a server',
  usage: `${config.prefix}serverinfo`,
  options: [],
  run: async (client, message, args) => {
    // command
    const servericon = message.guild.iconURL;
    const owner = await message.guild.members.fetch(message.guild.ownerID);
    const channels = message.guild.channels.cache.size;
    const serverembed = new Discord.MessageEmbed()
    .setTitle('Server Information')
    .setColor(config.embedColor)
    .setThumbnail(servericon)
    .addField('Server Name', message.guild.name)
    .addField('Owner', owner.user.toString(), true)
    .addField('Channels', `${channels}`, true)
    .addField('Roles', `${message.guild.roles.cache.size}`, true)
    .addField('Created On', `${message.guild.createdAt}`)
    .addField('You Joined', `${message.member.joinedAt}`)
    .addField('Total Members', `${message.guild.memberCount}`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter(message.user.username, message.user.avatarURL());
    message.reply({ embeds: [serverembed] });
  },
};