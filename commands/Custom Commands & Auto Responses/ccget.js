/* eslint-disable no-redeclare */
const Discord = require('discord.js')
const config = require('../../config.json');
const ccSchema = require('../../models/ccschema.js');
module.exports = {
    name: 'ccget',
    category: 'Custom Commands and Auto Reponses',
    description: 'Lists all custom commands',
    usage: `${config.prefix}ccget [command ID]`,
    run: async (client, message, args) => {
    // command
    const numCommands = await ccSchema.countDocuments({});
    const fields = [];
    if(args[0]){
        if(args[0] > numCommands){
            return message.reply('That command doesn\'t exist!');
        }
        const command = ccSchema.findOne({ id: args[0] });
        for(var i = 0; i < command.responses.length;i++){
            fields.push({ 'name':`Response #${i + 1}`, 'value': `${command.responses[i]}` });
        }
        const embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setTitle(`Command #${args[0]}`)
                .setDescription(command.trigger)
                .addFields(fields);
        return message.channel.send({ embeds: [embed] });
    }
    else{
        for(var i = 1;i < numCommands + 1;i++){
            const command = await ccSchema.findOne({ id: i }).exec();
            fields.push({ 'name': `#${i}`, 'value': `Trigger: ${command.trigger}` });
        }
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Custom Commands')
            .addFields(fields);
        return message.channel.send({ embeds: [embed] });
        }
    },
};