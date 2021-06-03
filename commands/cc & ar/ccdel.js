const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const ccSchema = require("C:/Users/kkanc/Beano/models/ccschema.js");
module.exports = {
    name: "ccdel",
    category: "Custom Commands and Auto Reponses",
    description: "Delete a certain custom command",
    usage: "ccdel [command ID]",
    run: async (client, message, args) => {
    //command
    const numCommands = await ccSchema.countDocuments({});
    let fields = [];
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(args[0] > numCommands){
            return message.reply("That command doesn't exist!");
        }
        const command= await ccSchema.findOne({id: args[0]});
        await ccSchema.deleteOne({id: args[0]});
        for(var i = command.id + 1;i < numCommands + 1; i ++){
            const nextCommand = await ccSchema.findOne({id:i});
            nextCommand.id --;
            await nextCommand.save();
        }
        message.reply(`Command with trigger ${command.trigger} successfully deleted!`);
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Command Deleted")
            .setTimestamp()
            .setDescription(`Command with trigger ${command.trigger} was cleared by user ` + message.author.tag);
        return logs.send(embed);
    }
};