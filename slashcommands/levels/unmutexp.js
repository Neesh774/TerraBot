const Discord = require('discord.js');
const config = require('../../config.json');
const mcSchema = require('../../models/mchannelschema.js');
module.exports = {
    name: 'unmutexp',
    category: 'levels',
    description: 'TerraBot will stop ignoring this channel when counting xp',
    usage: `${config.prefix}unmutexp [channel]`,
    options: [
        {
            name: 'channel',
            type: 'CHANNEL',
            description: 'The channel you want to unmute',
            required: false,
        },
    ],
    run: async (client, message, args) => {
    // command
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.reply('You don\'t have permissions for that :/');
        }
        let channel = args[0];
        if(!args[0]){
            channel = message.channel;
        }
        const mc = await mcSchema.findOne({ channel: channel.id });
        if(!mc){
            return message.reply('That channel isn\'t muted!');
        }
        else{
            await mcSchema.deleteOne({ channel: channel.id });
        }
        return message.reply(`Successfully xp unmuted ${channel}`);
    },
};