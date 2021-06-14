const Discord = require("discord.js")
const config = require("../../config.json");
const sSchema = require('../../models/suggestschema');
module.exports = {
    name: "suggest",
    category: "suggestions",
    description: "Suggest something in <#837385962183065650>!",
    usage: `${config.prefix}suggest`,
    run: async (client, message, args) => {
    //command
    const numSuggest = await sSchema.countDocuments({});
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Suggestion #${numSuggest + 1}`)
            .setDescription(args.join(" "));
        const AC = await client.guilds.fetch(config.AC); 
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