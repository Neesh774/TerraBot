const Discord = require("discord.js");
const config = require("../../config.json");
const mcSchema = require('../../models/mchannelschema.js');
module.exports = {
    name: "mutexp",
    category: "levels",
    description: "TerraBot will ignore this channel when counting xp",
    usage: `${config.prefix}mutexp <channel>`,
    options: [
        {
            name: 'channel',
            type: 'CHANNEL',
            description: 'The channel you want to mute',
            required: true,
        },
    ],
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[0]){
            return message.reply("Which channel should I ignore?");
        }
        let channelID = args[0].substring(2, 20);
        let channel = message.mentions.channels.first() || await message.guild.channels.cache.get(channelID);
        if (!channel) return message.channel.send({content: `:x: | **Channel Not Found**`});
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