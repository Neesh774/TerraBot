const Discord = require('discord.js');
const config = require('C:/Users/kkanc/Beano/config.json');

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage, client){
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);

        if(newMessage.partial) return;
        if(newMessage.author.bot) return;
        if(oldMessage.content == newMessage.content) return;
        
        const embedMessageUpdate = new Discord.MessageEmbed()
            .setTitle("Message Edited")
            .setColor("#f5c842")
            .addField("Author", `${oldMessage.author} | ${oldMessage.author.id}`)
            .addField("Edited in", `<#${newMessage.channel.id}> | ${newMessage.channel.id}`)
            .addField("Jump!", `[Click here](${newMessage.url})`)
            .addField("Old", `${oldMessage.content}`)
            .addField("New", `${newMessage.content}`)
            .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
        logs.send(embedMessageUpdate);
    }
}