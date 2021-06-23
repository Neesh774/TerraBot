const Discord = require("discord.js");
const config = require("../../config.json");
const ms = require('ms');
module.exports = {
    name: "mute",
    category: "moderation",
    description: "TerraBot exiles the user to the land of the rats",
    usage: `${config.prefix}mute <user> [time]`,
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("You need to give me someone to mute!");
        }
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!member) return message.channel.send({content: "**User Is Not In The Guild**"});
        if (member === message.member) return message.channel.send({content: "**You Cannot Mute Yourself**"})
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);
        if(member.roles.cache.has('838076447095914526')){
            return message.reply("That user is already muted.");
        }
        if(!args[1]){
            member.roles.add(message.guild.roles.cache.get(config.mutedRole));
            member.send({content:`You were muted in ${message.guild.name}`});
            return message.reply(`Muted ${member.toString()}`);
        }
        else{
            let time;
            try{
                time = ms(args[1]);
            }
            catch(e){return message.channel.send({content: ":x: There was an error. Please make sure you're using the proper arguments and try again."});}
            member.roles.add(message.guild.roles.cache.get(config.mutedRole));
            member.send({content: `You were muted in ${message.guild.name} for ${args[1]}`});
            setTimeout(() => {
                member.send({content: "You were unmuted in " + message.guild.name});
                member.roles.remove(message.guild.roles.cache.get(config.mutedRole));
            }, time);
            return message.reply(`Muted ${member.toString()}`);
        }
    }
};