const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.js')
const rrSchema = require('../../models/rrschema.js');
module.exports = {
    name: 'rrall',
    category: 'Reaction Roles',
    description: 'Displays all current reaction roles',
    usage: `${config.prefix}rrall`,
    run: async (client, message, args) => {
        const numRRs = await rrSchema.countDocuments();
        const fields = [];
        for(var i = 1;i < numRRs + 1; i++){
            const schema = await rrSchema.findOne({ id: i });
            const msgchannel = await message.guild.channels.cache.get(schema.channelID)
            const msg = await msgchannel.messages.fetch(schema.messageID);
            fields.push({ 'name': `ID: #${i}`, 'value': `[Jump to ${msgchannel.toString()}](${msg.url})` });
        }
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Reaction Roles for ' + message.guild.name)
            .addFields(fields);
        return message.channel.send({ embeds: [embed] });
    },
};