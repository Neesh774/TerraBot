const Discord = require('discord.js');
const config = require('../config.json');
const rrSchema = require('../models/rrschema.js');

module.exports = {
    name: 'messageReactionRemove',
    async execute(messageReaction, user, client){
        const message = messageReaction.message;
        const schema = await rrSchema.findOne({channelID: message.channel.id, messageID: message.id, reactionID: messageReaction.emoji.id})
        if(schema){
            const member = message.guild.members.cache.get(user.id);
            if(member.roles.cache.has(schema.roleID)){
            member.roles.remove(schema.roleID);
            member.send(`Removed your ${message.guild.roles.cache.get(schema.roleID).name} role in ${message.guild.name}!`);
            const AC = await client.guilds.fetch(config.AC); 
            const logs = await AC.channels.cache.get(config.logs);
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle("Reaction role removed")
                .setDescription(`${user.tag} was removed from the ${message.guild.roles.cache.get(schema.roleID).name} role.`)
                .setTimestamp()
                .setAuthor(user.tag, user.avatarURL());
            return logs.send(embed);
        }
    }
    }
}