const Discord = require("discord.js");
const config = require("../../config.json");
const mSchema = require('../../models/memberschema.js');
const functions = require('../../functions.js');
module.exports = {
    name: "setxp",
    category: "levels",
    description: "TerraBot will change the xp a user is at",
    usage: `${config.prefix}setxp <user> <xp>`,
    run: async (client, message, args) => {
        //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Whose xp should I change?'?");
        }
        if(!args[1]){
            return message.reply("What xp should I set them at?");
        }
        let user = message.mentions.members.first() || message.guild.members.cache.fetch(args[0]);
        if (!user) return message.channel.send(`:x: | **User Not Found**`);
        
        let member = await mSchema.findOne({userID: user.id});
        if(args[1] < 0){
            message.reply("Couldn't set them to that xp.");
        }
        try{
            member.xp = args[1];
            let newlevel = await functions.getLevel(args[1]/100);
            member.level = newlevel;
            let xp = await functions.getXP(newlevel);
            member.levelxp = args[1] - xp;
            member.toNextLevel = await functions.getXP(newlevel + 1) - args[1];
            await member.save();
            message.reply(`Successfully set them to xp ${args[1]} at level ${member.level}!`);
        }
        catch(e){
            console.log(e.stack);
            message.reply("Couldn't set them to that xp.");
        }
    }
};