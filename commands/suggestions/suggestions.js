const Discord = require("discord.js")
const suggestions = require("C:/Users/kkanc/Beano/suggestions.json")
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
module.exports = {
    name: "suggestions",
    category: "suggestions",
    description: "Lists all suggestions",
    usage: "suggestions",
    run: async (client, message, args) => {
    //command
    if(args[0] > suggestions.numberSuggest + 1){
        return message.reply("That suggestion doesn't exist!");
    }
    let fields = [];
    for(var i = 1;i < suggestions.numberSuggest+1;i ++){
        fields.push({"name": `#${i} ${message.guild.members.cache.get(suggestions[i][1]).nickname}`, "value": `${suggestions[i][2]} | **${suggestions[i][3]}**`});
    }
    let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Suggestions")
        .setDescription(`Here are all of the suggestions for Arcade Cafe`)
        .addFields(fields);
    return message.channel.send(embed);
    }
};