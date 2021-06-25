const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage, client){
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);

        if(newMessage.partial) return;
        if(newmessage.user.bot) return;
        if(oldMessage.content == newMessage.content) return;
        
        const embedMessageUpdate = new Discord.MessageEmbed()
            .setTitle("Message Edited")
            .setColor("#f5c842")
            .addField("Author", `${oldmessage.user} | ${oldmessage.user.id}`)
            .addField("Edited in", `<#${newMessage.channel.id}> | ${newMessage.channel.id}`)
            .addField("Jump!", `[Click here](${newMessage.url})`)
            .addField("Old", `${oldMessage.content}`)
            .addField("New", `${newMessage.content}`)
            .setThumbnail(newmessage.user.displayAvatarURL({ dynamic: true }))
        logs.send({embeds: [embedMessageUpdate]});
	}
}