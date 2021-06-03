const Discord = require("discord.js")
const config = require("C:/Users/kkanc/Beano/config.json");
const rrSchema = require("C:/Users/kkanc/Beano/models/rrschema.js");
module.exports = {
    name: "rrdel",
    category: "Reaction Roles",
    description: "Deletes a certain reaction role",
    usage: "rrdel [reaction role ID]",
    run: async (client, message, args) => {
        //reaction role
        const numReactionRoles = await rrSchema.countDocuments({});
        if(args[0]){
            let fields = [];
                if(!message.member.hasPermission("MANAGE_MESSAGES")){
                    return message.reply("You don't have permissions for that :/");
                }
                if(args[0] > numReactionRoles){
                    return message.reply("That reaction role doesn't exist!");
                }
                const reactionRole= await rrSchema.findOne({id: args[0]});
                await rrSchema.deleteOne({id: args[0]});
                for(var i = reactionRole.id + 1;i < numReactionRoles + 1; i ++){
                    const nextRR = await rrSchema.findOne({id:i});
                    nextRR.id --;
                    await nextRR.save();
                }
                message.reply(`Reaction role successfully deleted!`);
                const AC = await client.guilds.fetch("833805662147837982"); 
                const logs = await AC.channels.cache.get("848592231391559710");
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("Reaction Role Deleted")
                    .setTimestamp()
                    .setDescription(`Reaction role was cleared by user ` + message.author.tag);
                return logs.send(embed);
        }
        else{
            if(!message.member.hasPermission("MANAGE_MESSAGES")){
                return message.reply("You don't have permissions for that :/");
            }
            rrSchema.deleteMany({});
            message.reply(`Reaction roles successfully cleared!`);
                const AC = await client.guilds.fetch("833805662147837982"); 
                const logs = await AC.channels.cache.get("848592231391559710");
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("Reaction Roles Cleared")
                    .setTimestamp()
                    .setDescription(`Reaction roles were cleared by user ` + message.author.tag);
                return logs.send(embed);
        }
    }  
};