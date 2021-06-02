const Discord = require("discord.js")
const mongoose = require('mongoose');
const sSchema = require('C:/Users/kkanc/Beano/models/suggestschema.js');
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
module.exports = {
    name: "suggestionsclear",
    category: "suggestions",
    description: "Clears all pending suggestions",
    usage: "suggestionsclear",
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        await sSchema.deleteMany();
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Commands were cleared")
            .setDescription("Commands were cleared by user " + message.member.username);
        logs.send(embed);
        return message.reply("Successfully cleared the suggestions list!");
    }
};