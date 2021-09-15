const Discord = require('discord.js');
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');
module.exports = {
    name: 'suggestget',
    category: 'suggestions',
    description: 'Tells you about a given suggestion',
    usage: `${config.prefix}suggestget <suggestion id>`,
    options: [
        {
            name: 'suggestion_id',
            type: 'INTEGER',
            description: 'The ID of the suggestion you want info about',
            required: true,
        },
    ],
    run: async (client, interaction) => {
    // command
    const numSuggest = await sSchema.countDocuments({});
    const id = interaction.options.getInteger('suggestion_id');
    if (id > numSuggest || id <= 0) {
        return interaction.editReply('That suggestion doesn\'t exist!');
    }
    const suggest = await sSchema.findOne({ id: id }).exec();
    const embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle('Suggestion #' + id)
        .setDescription(`${suggest.suggestion}`)
        .addField('Status', suggest.status)
        .addField('Reason', suggest.reason)
        .addField('Votes', `👍 ${suggest.upvotes}, 👎 ${suggest.downvotes}`)
        .setFooter(suggest.createdAt)
        .setAuthor(suggest.createdBy, suggest.createdByIcon);
    return interaction.editReply({ embeds: [embed] });

    },
};