const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema.js');
module.exports = {
    name: 'clearxp',
    category: 'levels',
    description: 'TerraBot will clear all of the xp',
    usage: `${config.prefix}clearxp`,
    run: async (client, message, args) => {
    // command
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.reply('You don\'t have permissions for that :/');
        }
        await mSchema.deleteMany();
        message.reply('Successfully cleared all of the levels!');
        const PS = await client.guilds.fetch(config.PS);
        const logs = await PS.channels.cache.get(config.logs);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Levels were cleared')
            .setTimestamp()
            .setDescription('All levels were cleared by user ' + message.author.toString());
        return logs.send({ embeds: [embed] });
    },
};