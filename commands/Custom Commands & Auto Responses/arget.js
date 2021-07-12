/* eslint-disable no-redeclare */
const Discord = require('discord.js')
const config = require('../../config.json');
const arSchema = require('../../models/arschema.js');
module.exports = {
    name: 'arget',
    category: 'Custom Commands and Auto Reponses',
    description: 'Lists all auto responses',
    usage: `${config.prefix}arget [command ID]`,
    run: async (client, message, args) => {
    // command
    const numResponses = await arSchema.countDocuments({});
    const fields = [];
    if(args[0]){
        if(args[0] > numResponses){
            return message.reply('That responder doesn\'t exist!');
        }
        const responder = await arSchema.findOne({ id: args[0] });
        for(var i = 0; i < responder.responses.length;i++){
            fields.push({ 'name':`Response #${i + 1}`, 'value': `${responder.responses[i]}` });
        }
        const embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle(`Responder #${args[0]}`)
                .setDescription(responder.trigger)
                .addFields(fields);
        return message.channel.send({ embeds: [embed] });
    }
    else{
        for(var i = 1;i < numResponses + 1;i++){
            const responder = await arSchema.findOne({ id: i }).exec();
            fields.push({ 'name': `#${i}`, 'value': `Trigger: ${responder.trigger}` });
        }
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Automatic Responder')
            .addFields(fields);
        return message.channel.send({ embeds: [embed] });
        }
    },
};