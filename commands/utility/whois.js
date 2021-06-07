    const Discord = require("discord.js")
    const config = require("../../config.json");

    module.exports = {
    name: "whois",
	aliases: ["info"],
    category: "utility",
    description: "Get information about a user",
    usage: "[command | user] or [command]",
    run: async (client, message, args) => {
    //command
    
{
    const user = message.mentions.users.first();
    if(!user)
        return message.reply('Please mention the user who you want info about.');
    
    var playing = ("[ " + user.presence.activities + " ]")
    
    const whothefuq = new Discord.MessageEmbed()
          .setTitle("User Info:")
          .addField("Full Username", `${user.tag}`)
          .addField("ID", user.id)
          .addField("Playing",playing, true)
          .addField("Status", `${user.presence.status}`, true)
          .addField("Joined Discord At", user.createdAt)
          .setColor(config.embedColor)
          .setTimestamp()
          .setThumbnail(user.avatarURL())  
      message.channel.send(whothefuq)

    };
    }
       
  
    
    };