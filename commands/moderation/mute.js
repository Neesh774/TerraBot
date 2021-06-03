const Discord = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
const ms = require('ms');
module.exports = {
    name: "mute",
    category: "moderation",
    description: "Beano exiles the user to the land of the rats",
    usage: "mute <user>",
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("You need to give me someone to mute!");
        }
        let memberID = args[0].substring(3, 21);
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        let member = await AC.members.fetch(memberID);a
        if(member.roles.cache.has('838076447095914526')){
            return message.reply("That user is already muted.");
        }
        member.roles.add(message.guild.roles.cache.get(`838076447095914526`));
        return message.reply(`Unmuted ${member.user.username}`);
    }
};