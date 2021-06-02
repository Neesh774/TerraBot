const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
const sSchema = require('C:/Users/kkanc/Beano/models/suggestschema.js');
module.exports = {
    name: "suggestget",
    category: "suggestions",
    description: "Tells you about a given suggestion",
    usage: "suggestget <suggestion id>",
    run: async (client, message, args) => {
    //command
    const suggestions = require("C:/Users/kkanc/Beano/suggestions.json");
    const numSuggest = await sSchema.countDocuments({});
    if(!args[0]){
        return message.reply("Which suggestion do you want me to get?");
    }
    if(args[0] > numSuggest || args[0] <= 0){
        return message.reply("That suggestion doesn't exist!");
    }
    const suggest = await sSchema.findOne({id: args[0]}).exec();
    let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Suggestion #" + args[0])
        .setDescription(`${suggest.suggestion}`)
        .addField("Status", suggest.status)
        .addField("Reason", suggest.reason)
        .setFooter(suggest.createdAt)
        .setAuthor(suggest.createdBy, suggest.createdByIcon);
    return message.channel.send(embed);
    
    }
};