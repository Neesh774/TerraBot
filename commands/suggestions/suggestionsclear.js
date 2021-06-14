const Discord = require("discord.js")
const sSchema = require("../../models/suggestschema");
const config = require("../../config.json");

module.exports = {
    name: "suggestionsclear",
    category: "suggestions",
    description: "Clears all pending suggestions",
    usage: `${config.prefix}suggestionsclear`,
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        await sSchema.deleteMany();
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Suggestions were cleared")
            .setTimestamp()
            .setDescription("Suggestions were cleared by user " + message.member.username);
        logs.send(embed);
        return message.reply("Successfully cleared the suggestions list!");
    }
};