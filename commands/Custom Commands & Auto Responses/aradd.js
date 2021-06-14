const Discord = require("discord.js")
const config = require("../../config.json");
const arSchema = require("../../models/arschema.js");
module.exports = {
    name: "aradd",
    category: "Custom Commands and Auto Reponses",
    description: "Creates a new auto responder",
    usage: `${config.prefix}aradd <trigger> <response> [another response] [another response]...`,
    run: async (client, message, args) => {
    //command
        const numResponders = await arSchema.countDocuments({});
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
        const ar = new arSchema({
            id: numResponders + 1,
            trigger: trigger,
            responsesArray: responses,
            created: message.createdAt.toUTCString(),
            createdByID: message.author.id
        });
        ar.save().catch(err => console.log(err));
        let fields = [];
        for(var i = 0;i < responses.length;i ++){
            fields.push({"name":`Response #${i +1}`, "value": responses[i]});
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTimestamp()
            .setTitle("Auto Response Created")
            .setDescription(`An auto responder was created by ${message.author.tag}`)
            .addField("Trigger", trigger)
            .addFields(fields);
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        logs.send(embed);
        return message.channel.send(embed);
    }
};