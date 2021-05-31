const Discord = require("discord.js")
const suggestions = require("C:/Users/kkanc/Beano/suggestions.json")
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
module.exports = {
    name: "suggest",
    category: "suggestions",
    description: "Suggest something in <#837385962183065650>!",
    usage: "suggest",
    run: async (client, message, args) => {
    //command
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Suggestion #${suggestions.numberSuggest + 1}`)
            .setDescription(args.join(" "));
        const AC = await client.guilds.fetch("833805662147837982"); 
        const suggest = await AC.channels.cache.get("834110251887230976");
        message.delete().then(msg =>{
            suggest.send(embed).then(msgtwo =>{
                let suggestionOptions = [msgtwo.id, message.author.id, args.join(" "), "Unread", "N/A"];
                suggestions[suggestions.numberSuggest + 1] = suggestionOptions;
                suggestions.numberSuggest ++;
                fs.writeFile("C:/Users/kkanc/Beano/suggestions.json", JSON.stringify(suggestions), err => {
                    if (err) console.log(err);
                 });
            })
        });
    }
};