const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema.js');
module.exports = {
    name: "mutexpuser",
    category: "levels",
    description: "TerraBot will ignore a certain user when counting xp",
    usage: `${config.prefix}mutexpuser <user>`,
    run: async (client, message, args) => {
        //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Who should I ignore?");
        }
        let user = args[0];
        
        let member = await mSchema.findOne({userID: user.id});
        console.log(member);
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