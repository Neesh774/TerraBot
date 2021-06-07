const Discord = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
const mSchema = require('C:/Users/kkanc/Beano/models/memberschema.js');
const functions = require('C:/Users/kkanc/Beano/functions.js');
module.exports = {
    name: "setxp",
    category: "levels",
    description: "Beano will change the xp a user is at",
    usage: "setxp <user> <xp>",
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
            member.levelxp = 0;
            await member.save();
            message.reply(`Successfully set them to xp ${args[1]} at level ${member.level}!`);
        }
        catch(e){
            console.log(e.stack);
            message.reply("Couldn't set them to that xp.");
        }
    }
};