const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema.js');
const functions = require('../../functions.js');
module.exports = {
    name: "setlevel",
    category: "levels",
    description: "TerraBot will change the level a user is at",
    usage: `${config.prefix}setlevel <user> <level>`,
    run: async (client, message, args) => {
        //command
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Whose level should I change?");
        }
        if(!args[1]){
            return message.reply("What level should I set them to?");
        }
        let user = args[0];
        
        let member = await mSchema.findOne({userID: user.id});
        if(args[1] < 0){
            message.reply("Couldn't set them to that level.");
        }
        try{
            member.level = args[1];
            let newxp = await functions.getXP(args[1]);
            member.xp = newxp;
            await member.save();
            message.reply(`Successfully set them to level ${args[1]}!`);
        }
        catch(e){
            console.log(e.stack);
            message.reply("Couldn't set them to that level. Please try again.");
        }
    }
};