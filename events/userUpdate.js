const Discord = require('discord.js');
const config = require('C:/Users/kkanc/Beano/config.json');

module.exports = {
    name: 'userUpdate',
    async execute(oldUser, newUser, client){
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        let updated = false;
        let embed = false;
        if(oldUser.avatar != newUser.avatar){
            embed = new Discord.MessageEmbed(client, newUser.guild)
                .setColor(config.embedColor)
                .setDescription(`**Profile Picture changed of ${newUser.toString()}**`)
                .setColor(config.embedColor)
                .setFooter(`ID: ${newUser.id}`)
                .setAuthor(newUser.guild.name, newUser.guild.iconURL())
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