const Discord = require('discord.js')
const sSchema = require('../../models/suggestschema');
const config = require('../../config.json');

module.exports = {
    name: 'suggestionsclear',
    category: 'suggestions',
    description: 'Clears all pending suggestions',
    usage: `${config.prefix}suggestionsclear`,
    options: [],
    run: async (client, message, args) => {
    // command
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.reply('You don\'t have permissions for that :/');
        }
        await sSchema.deleteMany();
        const PS = await client.guilds.fetch(config.PS);
        const logs = await PS.channels.cache.get(config.logs);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Suggestions were cleared')
            .setTimestamp()
            .setDescription('Suggestions were cleared by user ' + message.member.username);
        logs.send({ embeds: [embed] });
        return message.reply('Successfully cleared the suggestions list!');
    },
};