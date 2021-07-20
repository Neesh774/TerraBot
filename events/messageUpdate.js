const Discord = require('discord.js');
const config = require('../config.json');
const badwords = require('../nonowords.json');
module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage, client){
        for(var i = 0;i < badwords.badwords.length;i++){
            if(message.content.toLowerCase().includes(badwords.badwords[i].toLowerCase())){
                message.delete().then(msg =>{
                    functions.warn(message.member, message.guild, message.channel, 'no no word', client);
                    msg.channel.send({ content: 'SMH MY HEAD NO NO WORD' });
                })
            }
        }
        const PS = await client.guilds.fetch(config.PS);
        const logs = await PS.channels.cache.get(config.logs);

        if(newMessage.partial) return;
        if(newMessage.author.bot) return;
        if(oldMessage.content == newMessage.content) return;

        const embedMessageUpdate = new Discord.MessageEmbed()
            .setTitle('Message Edited')
            .setColor('#f5c842')
            .addField('Author', `${oldMessage.author.toString()} | ${oldMessage.author.id}`)
            .addField('Edited in', `<#${newMessage.channel.toString()}> | ${newMessage.channel.id}`)
            .addField('Jump!', `[Click here](${newMessage.url})`)
            .addField('Old', `${oldMessage.content}`)
            .addField('New', `${newMessage.content}`)
            .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
        logs.send({ embeds: [embedMessageUpdate] });
	},
}