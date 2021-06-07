const Discord = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
const mSchema = require('C:/Users/kkanc/Beano/models/memberschema.js');
const functions = require('C:/Users/kkanc/Beano/functions.js');
module.exports = {
    name: "setlevel",
    category: "levels",
    description: "Beano will change the level a user is at",
    usage: "setlevel <user> <level>",
    run: async (client, message, args) => {
        //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Whose level should I change?");
        }
        if(!args[1]){
            return message.reply("What level should I set them to?");
        }
        let user = message.mentions.members.first() || message.guild.members.cache.fetch(args[0]);
        if (!user) return message.channel.send(`:x: | **User Not Found**`);
        
        let member = await mSchema.findOne({userID: user.id});
        if(args[1] < 0){
            message.reply("Couldn't set them to that level.");
        }
        try{
            member.level = args[1];
            let newxp = await functions.getXP(args[1]);
            member.xp = newxp;
            member.levelxp = 0;
            member.toNextLevel = await functions.getXP(args[1]+1) - newxp;
            await member.save();
            message.reply(`Successfully set them to level ${args[1]}!`);
        }
        catch(e){
            console.log(e.stack);
            message.reply("Couldn't set them to that level. Please try again.");
        }
    }
};