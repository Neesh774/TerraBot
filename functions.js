const warnings = require('./warnings.json');
const config = require('./config.json');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },
    warn: async function(member, guild, channel, reason, client){
        if(!warnings[member.id]){
            warnings[member.id] = 0;
        }
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        warnings[member.id] ++;
        if(!reason){
            reason = "N/A";
        }
        if(warnings[member.id] == 1 && reason){
            let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`${member.user.username} was warned in ${channel.name} for reason ${reason}. They now have 1 warning.`)
            logs.send(embed);
            channel.send(`${member.user.username} was warned for the first time for reason: ${reason}.`)
        }
        if(warnings[member.id] == 2 && reason){
            let mute= member.guild.roles.cache.find(role => role.name === config.mutedRole);
            member.roles.add(mute);
            setTimeout(function(){
                member.roles.remove(mute);
            }, (2 * 60 * 60 * 1000));
            let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.user.username} was warned`)
                .setDescription(`${member.user.username} was warned for the second time in ${channel.name} for reason ${reason}.`)
            logs.send(embed);
            channel.send(`${member.user.username} was warned for the second time for reason: ${reason}. They were muted for 2 hours.`)
        }
        else if(warnings[member.id] == 3){
            let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`${member.user.username} was warned in ${channel.name} for reason ${reason}. They now have 3 warnings.`)
            logs.send(embed);
            channel.send(`${member.user.username} was warned for the third time for reason: ${reason}.`)
        }
        else if(warnings[member.id] == 4){
            const sembed2 = new MessageEmbed()
                    .setColor(config.embedColor)
                    .setDescription(`**You Have Been Kicked From ${message.guild.name} for - ${reason || "No Reason!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                member.send(sembed2).then(() =>
                    member.kick()).catch(() => null);
                let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`${member.user.username} was warned in ${channel.name} for reason ${reason}. They now have 4 warnings.`)
                logs.send(embed);
                channel.send(`${member.user.username} was warned for the fourth time for reason: ${reason}. They were kicked.`)
        }
        fs.writeFile("./warnings.json", JSON.stringify(warnings), err => {
            if (err) console.log(err);
         });
    }
};