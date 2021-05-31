const Discord = require("discord.js");
const functions = require("C:/Users/kkanc/Beano/functions.js");

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Warns the given user. 2 Warns = 2 Hour Mute, 4 Warns = Kick",
    usage: "warn <user> [reason]",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("You need to give me someone to warn!");
        }
        var reason;
        if(args[1]){
            reason = args[1];
        }
        let memberID = args[0].substring(3, 21);
        const AC = await client.guilds.fetch("833805662147837982"); 
        let member = await AC.members.fetch(memberID);

        functions.warn(member, message.guild, message.channel, reason, client);
    }
}
