const Discord = require('discord.js')
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');

module.exports = {
    name: 'suggestions',
    category: 'suggestions',
    description: 'Lists all suggestions',
    usage: `${config.prefix}suggestions`,
    run: async (client, message, args) => {
    // command
    const fields = [];
    const numSuggest = await sSchema.countDocuments({});
    for(var i = 1;i < numSuggest + 1;i++){
        const suggest = await sSchema.findOne({ id: i }).exec();
        fields.push({ 'name': `#${i} ${suggest.createdBy} | ${suggest.status}`, 'value': `${suggest.suggestion} | 👍 ${suggest.upvotes} 👎 ${suggest.downvotes}` });
    }
    const embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle('Suggestions for ' + message.guild.name)
        .addFields(fields);
    return message.channel.send({ embeds: [embed] });
    },
};