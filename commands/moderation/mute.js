const Discord = require("discord.js");
const config = require("../../config.json");
const ms = require('ms');
module.exports = {
    name: "mute",
    category: "moderation",
    description: "Beano exiles the user to the land of the rats",
    usage: `${config.prefix}mute <user> [time]`,
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("You need to give me someone to mute!");
        }
        let memberID = args[0].substring(3, 21);
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        let member = await AC.members.fetch(memberID);
        if(member.roles.cache.has('838076447095914526')){
            return message.reply("That user is already muted.");
        }
        if(!args[1]){
            member.roles.add(message.guild.roles.cache.get(config.mutedRole));
            member.send(`You were muted in ${message.guild.name}`);
            return message.reply(`Muted ${member.toString()}`);
        }
        else{
            let time;
            try{
                time = ms(args[1]);
            }
            catch(e){return message.channel.send(":x: There was an error. Please make sure you're using the proper arguments and try again.");}
            member.roles.add(message.guild.roles.cache.get(config.mutedRole));
            member.send(`You were muted in ${message.guild.name} for ${args[1]}`);
            setTimeout(() => {
                member.send("You were unmuted in " + message.guild.name);
                member.roles.remove(message.guild.roles.cache.get(config.mutedRole));
            }, time);
            return message.reply(`Muted ${member.toString()}`);
        }
    }
};