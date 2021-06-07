const Discord = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Beano brings the user back from the land of the rats",
    usage: "mute <user>",
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("You need to give me someone to unmute!");
        }
        let memberID = args[0].substring(3, 21);
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        let member = await AC.members.fetch(memberID);
        if(!member.roles.cache.has('838076447095914526')){
            return message.reply("That user isn't muted.");
        }
        member.roles.remove(message.guild.roles.cache.get(`838076447095914526`));
        return message.reply(`Unmuted ${member.toString()}`);
    }
};