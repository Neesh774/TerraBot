const Discord = require('discord.js');
const config = require('../config.json');
const rrSchema = require('../models/rrschema.js');
const sbSchema = require('../models/starboard.js');
const mSchema = require("../models/memberschema.js");
const sSchema = require("../models/suggestschema.js");

module.exports = {
    name: 'messageReactionAdd',
    async execute(messageReaction, user, client){
        const message = messageReaction.message;
        const schema = await rrSchema.findOne({channelID: message.channel.id, messageID: message.id, reactionID: messageReaction.emoji.id});
        const PS = await client.guilds.fetch(config.PS); 
        if(schema){
            const member = message.guild.members.cache.get(user.id);
            if(!member.roles.cache.has(schema.roleID)){
                member.roles.add(schema.roleID);
                member.send({content: `Gave you the ${message.guild.roles.cache.get(schema.roleID).name} role in ${message.guild.name}!`});
                const logs = await PS.channels.cache.get(config.logs);
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("Reaction role used")
                    .setDescription(`${user.tag} was given the ${message.guild.roles.cache.get(schema.roleID).name} role.`)
                    .setTimestamp()
                    .setAuthor(user.tag, user.avatarURL());
                return logs.send({embeds: [embed]});
            }
        }
        if(message.reactions.cache.size == 5 && message.reactions.cache.every(reaction => reaction.emoji.id == config.starboardEmote)){
            const starboardChannel = await PS.channels.cache.get(config.starboardChannel);
            const parsedLinks = message.content.match(/^https?:\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?$/);
            const attachments = message.attachments && message.attachments.first() ? message.attachments.first() : undefined;
            if (parsedLinks && parsedLinks.length > 0) {
              // Removing links
              message.content.replace(/^https?:\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?$/, '');
            }
            
            const sb = new sbSchema({
                messageID: message.id,
                channelID: message.channel.id,
                author: message.author.username,
                authorID: message.author.id,
                authorAvatar: message.author.avatarURL()
            })
            sb.save();

            const member = await mSchema.findOne({userID: message.author.id});
            member.starboards ++;
            await member.save();

            const emb = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL())
              .addField('Channel', messageReaction.message.channel.toString(), false)
              // eslint-disable-next-line quotes
              .setColor(config.embedColor)
            if (message.content.length > 0) emb.setDescription(message.content.slice(0, 1999));
            if (parsedLinks) emb.addField('Links', parsedLinks.join('\n'), true);
            emb.addField('Source', `[Jump!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`);
            if (attachments || (parsedLinks && parsedLinks.length > 0)) emb.setImage(attachments ? attachments.url : parsedLinks.length > 0 ? parsedLinks[0] : '');
            return starboardChannel.send({embeds: [emb]});
        }
        const suggest = await sSchema.findOne({messageID: message.id })
        if(suggest && !user.bot){
            switch(messageReaction.emoji.id){
                case(config.upvote):
                    suggest.upvotes ++;
                    break;
                case(config.downvote):
                    suggest.downvotes ++;
                    break;
            }
            await suggest.save();
        }
    }
}