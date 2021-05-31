const Discord = require("discord.js")
const suggestions = require("C:/Users/kkanc/Beano/suggestions.json")
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
module.exports = {
    name: "suggestget",
    category: "suggestions",
    description: "Tells you about a given suggestion",
    usage: "suggestget <suggestion id>",
    run: async (client, message, args) => {
    //command
    if(!args[0]){
        return message.reply("Which suggestion do you want me to get?");
    }
    if(args[0] > suggestions.numberSuggest + 1){
        return message.reply("That suggestion doesn't exist!");
    }
    let suggestAuthor = message.guild.members.cache.get(suggestions[args[0]][1]);
    let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Suggestion #" + args[0])
        .setDescription(`${suggestions[args[0]][2]}`)
        .addField("Status", suggestions[args[0]][3])
        .addField("Reason", suggestions[args[0]][4])
        .setAuthor(suggestAuthor.nickname, suggestAuthor.user.avatarURL());
    return message.channel.send(embed);
    
    }
};