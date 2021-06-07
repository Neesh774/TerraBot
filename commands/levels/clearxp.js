const Discord = require("discord.js");
const config = require("../../config.json");
const mSchema = require('../../models/memberschema.js');
module.exports = {
    name: "clearxp",
    category: "levels",
    description: "Beano will clear all of the xp",
    usage: "clearxp",
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        await mSchema.deleteMany();
        message.reply("Successfully cleared all of the levels!");
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Levels were cleared")
            .setTimestamp()
            .setDescription("All levels were cleared by user " + message.author.tag);
        return logs.send(embed);
    }
};