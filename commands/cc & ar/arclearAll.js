const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const arSchema = require("C:/Users/kkanc/Beano/models/arschema.js");
module.exports = {
    name: "arclearall",
    category: "Custom Commands and Auto Reponses",
    description: "Clears all auto responders",
    usage: "arclearall",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        await arSchema.deleteMany();
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Responders were cleared")
            .setTimestamp()
            .setDescription("Responders were cleared by user " + message.author.tag);
        logs.send(embed);
        return message.reply("Successfully cleared the responders list!");
        
    }
};