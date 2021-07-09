const Discord = require('discord.js');
const config = require('../../config.json');
const mcSchema = require('../../models/mchannelschema.js');
module.exports = {
    name: "mutexp",
    category: "levels",
    description: "TerraBot will ignore this channel when counting xp",
    usage: `${config.prefix}mutexp <channel>`,
    run: async (client, message, args) => {
    //command
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Which channel should I ignore?");
        }
        let channel = args[0];
        let mc = await mcSchema.findOne({channel: channelID});
        if(!mc){
            mc = new mcSchema({
                channel: channelID
            }); 
            await mc.save();
        }
        else{
            return message.reply("That channel is already muted!");
        }
        return message.reply(`Successfully xp muted ${channel.toString()}`);
    }
};