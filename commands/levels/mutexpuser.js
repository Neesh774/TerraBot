const Discord = require("discord.js");
const config = require("../../config.json");
const mSchema = require('../../models/memberschema.js');
module.exports = {
    name: "mutexpuser",
    category: "levels",
    description: "Beano will ignore a certain user when counting xp",
    usage: "mutexpuser <user>",
    run: async (client, message, args) => {
        //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Who should I ignore?");
        }
        let user = message.mentions.members.first() || message.guild.members.cache.fetch(args[0]);
        if (!user) return message.channel.send(`:x: | **User Not Found**`);
        
        let member = mSchema.findOne({userID: user});
        if(member.muted){
            member.muted = false;
            await member.save();
            return message.reply(`XP unmuted user ${member.name}`);
        }
        member.muted = true;
        await member.save();
        return message.reply(`XP muted user ${member.name}`);
    }
};