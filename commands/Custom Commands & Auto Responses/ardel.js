const Discord = require("discord.js")
const config = require("../../config.json");
const arSchema = require("../../models/arschema.js");
module.exports = {
    name: "ardel",
    category: "Custom Commands and Auto Reponses",
    description: "Delete a certain auto responder",
    usage: `${config.prefix}ardel <responder ID>`,
    run: async (client, message, args) => {
    //responder
    const numResponders = await arSchema.countDocuments({});
    let fields = [];
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Which responder should I delete?");
        }
        if(args[0] > numResponders){
            return message.reply("That responder doesn't exist!");
        }
        const responder= await arSchema.findOne({id: args[0]});
        await arSchema.deleteOne({id: args[0]});
        for(var i = responder.id + 1;i < numResponders + 1; i ++){
            const nextResponse = await arSchema.findOne({id:i});
            nextResponse.id --;
            await nextResponse.save();
        }
        message.reply(`Responder with trigger ${responder.trigger} successfully deleted!`);
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Responder Deleted")
            .setTimestamp()
            .setDescription(`Responder with trigger ${responder.trigger} was cleared by user ` + message.user.tag);
        return logs.send({embeds: [embed]});
    }
};