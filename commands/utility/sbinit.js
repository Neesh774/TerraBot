const Discord = require("discord.js")
const functions = require("C:/Users/kkanc/Beano/functions.js");
const StarboardsManager = require('discord-starboards');

module.exports = {
    name: "sbinit",
    category: "utility",
  description: "Initializes the starboard in the server",
  usage: "sbinit",
  run: async (client, message, args) => {
  //command
    if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')){
        return message.reply("You do not have permissions for this.");
    }
    try{
        if(client.starboardsManager.starboards.find(s => s.guildID === message.guild.id)) {
            return message.channel.send('There is already a starboard on this server!');
        }
    }
    catch(e){
        const AC = await client.guilds.fetch("833805662147837982");
        console.log("Got server " + AC.name);
        client.starboardsManager.create(AC.channels.cache.get("837086202603372544"), {
            emoji: '835149950483693648',
            threshold: 5,
            color: "693426"
        });
        message.reply("Successfully initialized starboard.");
    }
  }
  };