const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'userUpdate',
    async execute(oldUser, newUser, client){
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);
        let updated = false;
        let embed = false;
        if(oldUser.avatar != newUser.avatar){
            embed = new Discord.MessageEmbed(client, newUser.guild)
                .setColor(config.embedColor)
                .setDescription(`**Profile Picture changed of ${newUser.toString()}**`)
                .setColor(config.embedColor)
                .setFooter(`ID: ${newUser.id}`)
                .setAuthor(PS.name, PS.iconURL())
                .addFields(
                    { name: 'Old:', value: `[Link](${oldUser.avatarURL()})`, inline: true },
                    { name: 'New:', value: `[Link](${newUser.avatarURL()})`, inline: true },
                )
                .setTimestamp();
        }
        if (oldUser.username !== newUser.username) {
            embed = new Discord.MessageEmbed(client, newUser.guild)
                .setColor(config.embedColor)
                .setDescription(`**Username changed of ${newUser.toString()}**`)
                .setColor(config.embedColor)
                .setFooter(`ID: ${newUser.id}`)
                .setAuthor(newUser.guild.name, newUser.guild.iconURL())
                .addFields(
                    { name: 'Old:', value: `${oldUser.name}`, inline: true },
                    { name: 'New:', value: `${newUser.name}`, inline: true },
                )
                .setTimestamp();
            updated = true;
        } 
    }
}