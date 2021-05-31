const Discord = require("discord.js")
const suggestions = require("C:/Users/kkanc/Beano/suggestions.json")
const config = require("C:/Users/kkanc/Beano/config.json");
const fs = require('fs');
module.exports = {
    name: "suggestmark",
    category: "suggestions",
    description: "Marks the given suggestion with the given status",
    usage: "suggestmark <suggestion id> <Dead|In_Progress|Done> [reason]",
    run: async (client, message, args) => {
    //command
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.reply("You don't have permissions for that :/");
    }
    if(!args[0]){
        return message.reply("Which suggestion do you want me to mark?");
    }
    if(args[0] > suggestions.numberSuggest){
        return message.reply("That suggestion doesn't exist!");
    }
    if(!args[1] || (args[1] != "Dead" && args[1] != "In_Progress" && args[1] != "Done")){
        return message.reply("Please make sure you are marking it as either `Dead`, `In_Progress`, or `Done`");
    }
    let suggestAuthor = message.guild.members.cache.get(suggestions[args[0]][1]);
    let index = args[0];
    suggestions[args[0]][3] = args[1];
    if(args[2]){
        args.splice(0, 2);
        let reason = args.join(" ");
        suggestions[index][4] = reason;
    }
    else{
        suggestions[index][4] = "N/A";
    }
    fs.writeFile("C:/Users/kkanc/Beano/suggestions.json", JSON.stringify(suggestions), err => {
        if (err) console.log(err);
    });    
    let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Suggestion #" + index + " updated successfully!")
        .setDescription(`${suggestions[index][2]}`)
        .addField("Status", `${suggestions[index][3]}`)
        .addField("Reason", `${suggestions[index][4]}`)
        .setAuthor(suggestAuthor.nickname, suggestAuthor.user.avatarURL());
    const AC = await client.guilds.fetch("833805662147837982"); 
    const suggest = await AC.channels.cache.get("834110251887230976");

    // const sMessage = suggest.messages.get(suggestions[args[0]][0]);
    
    return message.channel.send(embed);
    }
};