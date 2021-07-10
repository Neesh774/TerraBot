const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'messageDelete',
    async execute(message, client){
        const PS = await client.guilds.fetch(config.PS);
        const logs = await PS.channels.cache.get(config.logs);

        if(!message.user) return;
        if(message.user.bot) return;

        const imageDelete = message.attachments.first() ? message.attachments.first().proxyURL : null;

        const embedMessageDelete = new Discord.MessageEmbed()
        .setTitle('Message Deleted')
        .addField('Author', `${message.user} | ${message.user.id}`)
        .addField('Deleted in', `${message.channel}`)
        .addField('Message Content', `${message.content || `[Attachment Link](${imageDelete})`}`)
        .setColor('#f54542')
        .setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
        .setImage(imageDelete)
        .setTimestamp();
        logs.send({ embeds: [embedMessageDelete] });
    },
}