const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
module.exports = {
    name: "ccget",
    category: "Custom Commands and Auto Reponses",
    description: "Lists all custom commands",
    usage: "ccget [command ID]",
    run: async (client, message, args) => {
    //command
    const commands = require("C:/Users/kkanc/Beano/customcommands.json")
    let fields = [];
    if(args[0]){
        if(args[0] > commands.numberSuggest){
            return message.reply("That command doesn't exist!");
        }
        for(var i = 1; i < commands[args[0].length];i ++){
            fields.push({"name":`Response #${i}`, "value": `${commands[args[0]][i]}`});
        }
        let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle(`Command #${args[0]}`)
                .setDescription(commands[args[0]])  
                .addFields(fields);
        return message.channel.send(embed);         
    }
    else{
        for(var i = 1;i < commands.numberSuggest + 1;i ++){
            fields.push({"name": `#${i}`, "value": `${commands[0]}`});
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Custom Commands")
            .setDescription(`Here are all of the custom commands for Arcade Cafe`)
            .addFields(fields);
        return message.channel.send(embed);
        }
    }
};