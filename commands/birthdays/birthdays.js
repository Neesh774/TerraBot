const Discord = require("discord.js");
const config = require("../../config.json");
const bSchema = require('../../models/bday.js');
const functions = require('../../functions.js');

module.exports = {
    name: "birthdays",
    category: "birthdays",
    description: "Beano tells you how old everyone is :)",
    usage: "birthdays",
    run: async (client, message, args) => {
    //command
        const birthdays = await bSchema.find();
        if(!birthdays){
            return message.reply("No one in this server has set their birthday yet.");
        }
        let fields = [];
        for(var i = 0;i < birthdays.length; i ++){
            fields.push({"name": birthdays[i].user, "value": birthdays[i].birthday.toString().slice(0, 15)});
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Birthdays of Arcade Cafe")
            .addFields(fields);
        return message.channel.send(embed);
    }
};