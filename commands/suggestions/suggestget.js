const Discord = require('discord.js')
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');
module.exports = {
    name: 'suggestget',
    category: 'suggestions',
    description: 'Tells you about a given suggestion',
    usage: `${config.prefix}suggestget <suggestion id>`,
    run: async (client, message, args) => {
    // command
    const numSuggest = await sSchema.countDocuments({});
    if(!args[0]){
        return message.reply('Which suggestion do you want me to get?');
    }
    if(args[0] > numSuggest || args[0] <= 0){
        return message.reply('That suggestion doesn\'t exist!');
    }
    const suggest = await sSchema.findOne({ id: args[0] }).exec();
    const embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle('Suggestion #' + args[0])
        .setDescription(`${suggest.suggestion}`)
        .addField('Status', suggest.status)
        .addField('Reason', suggest.reason)
        .addField('Votes', `👍 ${suggest.upvotes}, 👎 ${suggest.downvotes}`)
        .setFooter(suggest.createdAt)
        .setAuthor(suggest.createdBy, suggest.createdByIcon);
    return message.channel.send({ embeds: [embed] });

    },
};