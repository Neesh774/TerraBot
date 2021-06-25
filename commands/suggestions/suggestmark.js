const Discord = require("discord.js")
const config = require("../../config.json");
const sSchema = require("../../models/suggestschema");
module.exports = {
    name: "suggestmark",
    category: "suggestions",
    description: "Marks the given suggestion with the given status",
    usage: `${config.prefix}suggestmark <suggestion id> <Dead|In_Progress|Done> [reason]`,
    run: async (client, message, args) => {
    //command
    const numSuggest = await sSchema.countDocuments({});
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.reply("You don't have permissions for that :/");
    }
    if(!args[0]){
        return message.reply("Which suggestion do you want me to mark?");
    }
    if(args[0] > numSuggest){
        return message.reply("That suggestion doesn't exist!");
    }
    if(!args[1] || (args[1].toLowerCase() != "dead" && args[1].toLowerCase() != "in_progress" && args[1].toLowerCase() != "done")){
        return message.reply("Please make sure you are marking it as either `Dead`, `In_Progress`, or `Done`");
    }
    const suggest = await sSchema.findOne({id: args[0]}).exec();
    let mark = args[1];
    let suggestAuthor = suggest.createdBy;
    let index = args[0];
    suggest.status = mark;
    if(args[2]){
        args.splice(0, 2);
        let reason = args.join(" ");
        suggest.reason = reason;
    }
    else{
        suggest.reason = "N/A";
    }
    suggest.save();
    let embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle("Suggestion #" + index + " updated successfully!")
        .setDescription(`${suggest.suggestion}`)
        .addField("Status", `${suggest.status}`)
        .addField("Reason", `${suggest.reason}`)
        .setAuthor(suggest.createdBy, suggest.createdByIcon);
    message.reply({embeds: [embed]});
    const PS = await client.guilds.fetch(config.PS); 
    const suggestChannel = await PS.channels.cache.get(config.suggestions);

    const sMessage = await suggestChannel.messages.fetch(suggest.messageID);
    if(mark.toLowerCase() === "dead"){
        let newSuggest = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Suggestion #${index} marked as dead`)
            .setDescription(`${suggest.suggestion}`)
            .addField("Status", "Dead") 
            .addField("Reason", `${suggest.reason}`)
        return sMessage.edit(newSuggest);
    }
    else if(mark.toLowerCase() === "in_progress"){
        let newSuggest = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Suggestion #${index} marked as In Progress!`)
            .setDescription(`${suggest.suggestion}`)
            .addField("Status", "In Progress")
            .addField("Reason", `${suggest.reason}`)
        return sMessage.edit(newSuggest);
    }
    else if(mark.toLowerCase() === "done"){
        let newSuggest = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Suggestion #${index} marked as implemented`)
            .setDescription(`${suggest.suggestion}`)
            .addField("Status", "Implemented")
            .addField("Reason", `${suggest.reason}`)
        sMessage.edit(newSuggest);
    }
    }
};