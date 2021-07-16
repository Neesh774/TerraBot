const Discord = require('discord.js');
const config = require('../config.json');
const rrSchema = require('../models/rrschema.js');
const sbSchema = require('../models/starboard.js');
const mSchema = require('../models/memberschema.js');
const sSchema = require('../models/suggestschema.js');

module.exports = {
    name: 'messageReactionAdd',
    async execute(messageReaction, user, client){
        const message = messageReaction.message;
        const schema = await rrSchema.findOne({ channelID: message.channel.id, messageID: message.id, reactionID: messageReaction.emoji.id });
        const PS = await client.guilds.fetch(config.PS);
        if(schema){
            const member = message.guild.members.cache.get(user.id);
            if(!member.roles.cache.has(schema.roleID)){
                member.roles.add(schema.roleID);
                member.send({ content: `Gave you the ${message.guild.roles.cache.get(schema.roleID).name} role in ${message.guild.name}!` });
                const logs = await PS.channels.cache.get(config.logs);
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle('Reaction role used')
                    .setDescription(`${user.tag} was given the ${message.guild.roles.cache.get(schema.roleID).name} role.`)
                    .setTimestamp()
                    .setAuthor(user.tag, user.avatarURL());
                return logs.send({ embeds: [embed] });
            }
        }
        if(message.reactions.cache.some(reaction => {
            return reaction.emoji.id === config.starboardEmote && reaction.count === 1
        })){
            const starboardChannel = await PS.channels.cache.get(config.starboardChannel);
            const attachments = message.attachments && message.attachments.first() ? message.attachments.first() : undefined;

            const sb = new sbSchema({
                messageID: message.id,
                channelID: message.channel.id,
                author: message.user.username,
                authorID: message.user.id,
                authorAvatar: message.user.avatarURL(),
            })
            sb.save();

            const member = await mSchema.findOne({ userID: message.user.id });
            member.starboards++;
            await member.save();

            const emb = new Discord.MessageEmbed()
              .setAuthor(message.user.username, message.user.avatarURL())
              .addField('Channel', messageReaction.message.channel.toString(), false)
              // eslint-disable-next-line quotes
              .setColor(config.embedColor)
            if (message.content.length > 0) emb.setDescription(message.content.slice(0, 1999));
            emb.addField('Source', `[Jump!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`);
            if (attachments) emb.setImage(attachments.url);
            return starboardChannel.send({ embeds: [emb] });
        }
        const suggest = await sSchema.findOne({ messageID: message.id })
        if(suggest && !user.bot){
            switch(messageReaction.emoji.id){
                case(config.upvote):
                    suggest.upvotes++;
                    break;
                case(config.downvote):
                    suggest.downvotes++;
                    break;
            }
            await suggest.save();
        }
    },
}