const Discord = require("discord.js")
const config = require("../../config.json");
const arSchema = require("../../models/arschema.js");
module.exports = {
    name: "arget",
    category: "Custom Commands and Auto Reponses",
    description: "Lists all auto responses",
    usage: "arget [command ID]",
    run: async (client, message, args) => {
    //command
    const numResponses = await arSchema.countDocuments({});
    let fields = [];
    if(args[0]){
        if(args[0] > numResponses){
            return message.reply("That responder doesn't exist!");
        }
        const responder = arSchema.findOne({id: args[0]});
        for(var i = 0; i < responder.responses.length;i ++){
            fields.push({"name":`Response #${i+1}`, "value": `${responder.responses[i]}`});
        }
        let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle(`Responder #${args[0]}`)
                .setDescription(responder.trigger)  
                .addFields(fields);
        return message.channel.send(embed);         
    }
    else{
        const numResponses = await arSchema.countDocuments({});
        for(var i = 1;i < numResponses + 1;i ++){
            const responder = await arSchema.findOne({id: i}).exec();
            fields.push({"name": `#${i}`, "value": `Trigger: ${responder.trigger}`});
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Automatic Responder")
            .setDescription(`Here are all of the automatic responses for Arcade Cafe`)
            .addFields(fields);
        return message.channel.send(embed);
        }
    }
};