const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "role",
    category: "moderation",
    description: "Beano gives the user whatever role you tell it to",
    usage: `${config.prefix}role <user> <role name>`,
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("You need to give me someone to give/remove the role!");
        }
        if(!args[1]){
            return message.reply("You need to give me a role to give/remove to them!");
        }
        let role = message.guild.roles.cache.find(role => role.name === args[1]);
        if(!role){
            return message.reply(`Couldn't find role ${args[1]} >_<`);
        }
        let memberID = args[0].substring(3, 21);
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        let member = await AC.members.fetch(memberID);
        if(member.roles.cache.has(role.id)){
            member.roles.remove(role.id);
            return message.reply(`Removed the role ${role.name} from ${member.nickname}`);
        }
        member.roles.add(role);
        return message.reply(`Gave ${member.user.username} the role ${role.name}`);
    }
};