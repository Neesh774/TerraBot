const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
module.exports = {
    name: "ccclearall",
    category: "Custom Commands and Auto Reponses",
    description: "Clears all custom commands",
    usage: "ccclearall",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        let emptyCommands = {"numberCommands": 0};
        fs.writeFile("C:/Users/kkanc/Beano/customcommands.json", JSON.stringify(emptyCommands), err => {
            if (err) console.log(err);
        });
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Commands were cleared")
            .setDescription("Commands were cleared by user " + message.member.username);
        logs.send(embed);
        return message.reply("Successfully cleared the commands list!");
        
    }
};