const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const ccSchema = require("C:/Users/kkanc/Beano/models/ccschema.js");
module.exports = {
    name: "ccclearall",
    category: "Custom Commands and Auto Reponses",
    description: "Clears all custom commands",
    usage: "ccclearall",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        await ccSchema.deleteMany();
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Commands were cleared")
            .setTimestamp()
            .setDescription("Commands were cleared by user " + message.author.tag);
        logs.send(embed);
        return message.reply("Successfully cleared the commands list!");
        
    }
};