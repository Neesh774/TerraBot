const Discord = require("discord.js")
const suggestions = require("C:/Users/kkanc/Beano/suggestions.json")
const config = require("C:/Users/kkanc/Beano/config.json");
const sSchema = require('C:/Users/kkanc/Beano/models/suggestschema.js');
const fs = require('fs');
module.exports = {
    name: "suggest",
    category: "suggestions",
    description: "Suggest something in <#837385962183065650>!",
    usage: "suggest",
    run: async (client, message, args) => {
    //command
    const numSuggest = await sSchema.countDocuments({});
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Suggestion #${numSuggest + 1}`)
            .setDescription(args.join(" "));
        const AC = await client.guilds.fetch("833805662147837982"); 
        const suggest = await AC.channels.cache.get("834110251887230976");
        message.delete().then(msg =>{
            suggest.send(embed).then(msgtwo =>{
                const sSuggest = new sSchema({
                    id: numSuggest + 1,
                    suggestion: args.join(" "),
                    createdBy: message.author.tag,
                    createdByIcon: message.author.avatarURL(),
                    createdByID: message.author.id,
                    createdAt: message.createdAt.toUTCString(),
                    messageID: msgtwo.id,
                    status: "Unread",
                    reason: "N/A"
                })
                sSuggest.save().catch(err => console.log(err));
                msgtwo.react(config.upvote);
                msgtwo.react(config.downvote);
            })
        });
    }
};