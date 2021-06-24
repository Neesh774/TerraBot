const Discord = require("discord.js")
const config = require("../../config.json");
const sSchema = require("../../models/suggestschema");
module.exports = {
    name: "suggestdel",
    category: "Custom Commands and Auto Reponses",
    description: "Deletes a certain suggestion",
    usage: `${config.prefix}suggestdel <suggestion ID>`,
    options: [
        {
            name: 'suggestion_id',
            type: 'INTEGER',
            description: 'The ID of the suggestion you want to delete',
            required: true,
        },
    ],
    run: async (client, message, args) => {
    //command
    const numSuggests = await sSchema.countDocuments({});
    let fields = [];
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Which suggestion am I deleting?");
        }
        if(args[0] > numSuggests){
            return message.reply("That command doesn't exist!");
        }
        const suggest = await sSchema.findOne({id: args[0]});
        await sSchema.deleteOne({id: args[0]});
        for(var i = suggest.id + 1;i < numSuggests + 1; i ++){
            const nextSuggest = await sSchema.findOne({id:i});
            nextSuggest.id --;
            await nextSuggest.save();
        }
        message.reply(`Suggestion with content ${suggest.suggestion} successfully deleted!`);
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Suggestion Deleted")
            .setTimestamp()
            .setDescription(`Suggestion with content ${suggest.suggestion} was cleared by user ` + message.author.tag);
        return logs.send({embeds: [embed]});
    }
};