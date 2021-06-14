const Discord = require("discord.js");
const config = require("../../config.json");
const mcSchema = require('../../models/mchannelschema.js');
module.exports = {
    name: "xpmuted",
    category: "levels",
    description: "Beano lists all the channels that are xp muted",
    usage: `${config.prefix}xpmuted`,
    run: async (client, message, args) => {
    //command
        let numMuted = await mcSchema.countDocuments();
        let fields = [];
        let list = await mcSchema.find({});
        const AC = await client.guilds.fetch(config.AC);
        for(var i = 0;i < numMuted; i ++){
            let channel = await AC.channels.cache.get(list[i].channel);
            fields.push({"name": `#${i+1}`, "value": `${channel.toString()}`})
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("XP Muted Channels")
            .addFields(fields);
        return message.channel.send(embed);
    }
};