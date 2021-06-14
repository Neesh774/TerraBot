const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Beano brings the user back from the land of the rats",
    usage: `${config.prefix}unmute <user>`,
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
        if(!member.roles.cache.has(config.mutedRole)){
            return message.reply("That user isn't muted.");
        }
        member.roles.remove(message.guild.roles.cache.get(config.mutedRole));
        return message.reply(`Unmuted ${member.toString()}`);
    }
};