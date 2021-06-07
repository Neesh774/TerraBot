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
        let memberID = args.shift().substring(3, 21);
        if(args[1]){
            reason = args.join(" ");
        }
        const AC = await client.guilds.fetch(config.AC); 
        let member = await AC.members.fetch(memberID);

        functions.warn(member, message.guild, message.channel, reason, client);
    }
}
