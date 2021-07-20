const config = require('../../config.json');
const Discord= require('discord.js')
module.exports = {
    name: "lock",
    category: "moderation",
    description: "Locks the current channel and prevents anyone from sending messages",
    usage: `${config.prefix}lock`,
    options: [],
    run: async (client, message, args) =>{
        if(!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") ) return message.reply("You don't have permissions for that :/");
        if(client.lockedChannels.has(message.channel.id)){
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: true
            })
            client.lockedChannels.delete(message.channel.id);
            console.log(client.lockedChannels);
            let lockEmbed = new Discord.MessageEmbed()                
                .setDescription(`Successfully unlocked ${message.channel.name}`)
                .setColor(config.embedColor)
            return message.reply({embeds: [lockEmbed]});
        }
        else{
            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            })
            client.lockedChannels.add(message.channel.id);
            console.log(client.lockedChannels);
            let unlockEmbed = new Discord.MessageEmbed()                
                .setDescription(`Successfully locked ${message.channel.name}`)
                .setColor(config.embedColor)
            return message.reply({embeds: [unlockEmbed]});
        }
    }
}