const Discord = require("discord.js");
const { ReactionRole } = require("reaction-role");
const config = require("C:/Users/kkanc/Beano/config.json");
const emojis = require("../../emojis.js")
const rrSchema = require('C:/Users/kkanc/Beano/models/rrschema.js');
module.exports = {
    name: "rrall",
    category: "utility",
    description: "Displays all current reaction roles",
    usage: "rrall",
    run: async(client, message, args) => {
        const numRRs = await rrSchema.countDocuments();
        let fields = [];
        for(var i = 1;i < numRRs + 1; i ++){
            let schema = await rrSchema.findOne({id: i});
            let msgchannel = await message.guild.channels.cache.get(schema.channelID)
            let msg = await msgchannel.messages.fetch(schema.messageID);
            fields.push({"name": `ID: #${i}`, "value": `[Jump to ${msgchannel.toString()}](${msg.url})`});
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Reaction Roles")
            .setDescription("Here are all of the reaction roles for Arcade Cafe")
            .addFields(fields);
        return message.channel.send(embed);
    }
}; 