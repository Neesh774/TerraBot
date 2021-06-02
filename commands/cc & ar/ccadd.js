const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const ccSchema = require("C:/Users/kkanc/Beano/models/ccschema.js");
const mongoose = require('mongoose');
const fs = require('fs');
module.exports = {
    name: "ccadd",
    category: "Custom Commands and Auto Reponses",
    description: "Creates a new custom command",
    usage: "ccadd <trigger> <response URL> [another response URL] [another response URL]...",
    run: async (client, message, args) => {
    //command
        const commands = require("C:/Users/kkanc/Beano/customcommands.json")
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("You need to give me a trigger!");
        }
        if(!args[1]){
            return message.reply("You need to give me atleast one response!");
        }
        let trigger = args[0];
        args.splice(0, 1);
        let responses = args;
        const cc = new ccSchema({
            trigger: trigger,
            responsesArray: responses,
            created: message.createdAt.toUTCString(),
            createdByID: message.author.id
        });
        cc.save().catch(err => console.log(err));
        let fields = [];
        for(var i = 0;i < responses.length;i ++){
            fields.push({"name":`Response #${i +1}`, "value": responses[i]});
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTimestamp()
            .setTitle("Custom Command Created")
            .setDescription(`A custom command was created by ${message.member.nickname}`)
            .addField("Trigger", trigger)
            .addFields(fields);
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        logs.send(embed);
        return message.channel.send(embed);
    }
};