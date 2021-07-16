const Discord = require("discord.js")
const config = require("../../config.json");
const rrSchema = require('../../models/rrschema.js');
module.exports = {
    name: "rrdel",
    category: "Reaction Roles",
    description: "Deletes a certain reaction role",
    usage: `${config.prefix}rrdel [reaction role ID]`,
    options: [
        {
            name: 'reaction_role_id',
            type: 'INTEGER',
            description: 'The ID of the reaction role you want to delete',
            required: false,
        },
    ],
    run: async (client, message, args) => {
        //reaction role
        const numReactionRoles = await rrSchema.countDocuments({});
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(args[0]){
            let fields = [];
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
                const PS = await client.guilds.fetch(config.PS); 
                const logs = await PS.channels.cache.get(config.logs);
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("Reaction Role Deleted")
                    .setTimestamp()
                    .setDescription(`Reaction role was cleared by user ` + message.user.tag);
                return logs.send({embeds: [embed]});
        }
        else{
            await rrSchema.deleteMany({});
            message.reply(`Reaction roles successfully cleared!`);
                const PS = await client.guilds.fetch(config.PS); 
                const logs = await PS.channels.cache.get(config.logs);
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("Reaction Roles Cleared")
                    .setTimestamp()
                    .setDescription(`Reaction roles were cleared by user ` + message.user.tag);
                return logs.send({embeds: [embed]});
        }
    }  
};