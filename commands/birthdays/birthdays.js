const Discord = require("discord.js");
const config = require("../../config.json");
const bSchema = require('../../models/bday.js');
const functions = require('../../functions.js');

module.exports = {
    name: "birthdays",
    category: "birthdays",
    description: "TerraBot tells you how old everyone is :)",
    usage: `${config.prefix}birthdays`,
    run: async (client, message, args) => {
    //command
    let list = await bSchema.find({});
    let numPages = Math.ceil(list.length / 10);
    const PS = await client.guilds.fetch(config.PS); 
    let fields = [];
    let start = 0;
    let end = 10;
    let page = 1;
    if(list.length < 10){
        end = list.length;
    }
    let numEntries = 10;
    let arg = 1;
    if(args[0]){
      arg = args[0];
    }
    if(args[0] > numPages || args[0] < 0){
      return message.reply("We don't seem to have that many users with birthdays yet.");
    }
    if(arg == numPages){
      numEntries = list.length - 10*(numPages - 1);  
    }
    start = 10 * (arg - 1);
    console.log(start)
    end = numEntries + start;
    console.log(end)
    page = arg;
    for(var i = start; i < end; i ++){
        console.log(i);
      fields.push({"name": `#${i+1} | ${list[i].user}`, "value": `${list[i].birthday.toString().slice(4, 10)}`})
    }
    let embed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
      .setTitle(`Birthdays [${page}/${numPages}]`)
      .addFields(fields)
      .setAuthor("TerraBot Birthdays", PS.iconURL());
    return message.channel.send(embed);
    }
};