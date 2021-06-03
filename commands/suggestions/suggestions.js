const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const sSchema = require('C:/Users/kkanc/Beano/models/suggestschema.js');

module.exports = {
    name: "suggestions",
    category: "suggestions",
    description: "Lists all suggestions",
    usage: "suggestions",
    run: async (client, message, args) => {
    //command
    let fields = [];
    const numSuggest = await sSchema.countDocuments({});
    for(var i = 1;i < numSuggest + 1;i ++){
        const suggest = await sSchema.findOne({id: i}).exec();
        fields.push({"name": `#${i} ${suggest.createdBy}`, "value": `${suggest.suggestion} | **${suggest.status}**`});
    }
    let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Suggestions")
        .setDescription(`Here are all of the suggestions for Arcade Cafe`)
        .addFields(fields);
    return message.channel.send(embed);
    }
};