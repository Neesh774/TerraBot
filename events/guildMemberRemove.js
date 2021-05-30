const Discord = require('discord.js');
const config = require('C:/Users/kkanc/Beano/config.json');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client){
        const AC = await client.guilds.fetch("833805662147837982"); 
        const logs = await AC.channels.cache.get("848592231391559710");
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${member.user.username} has left the server`)
            .setThumbnail(member.user.avatarURL())
            .setTimestamp();
        return logs.send(embed);
    }
}