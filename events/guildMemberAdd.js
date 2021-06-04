const Discord = require('discord.js');
const config = require('C:/Users/kkanc/Beano/config.json');
const mSchema = require('C:/Users/kkanc/Beano/models/memberschema.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client){
        const AC = await client.guilds.fetch("833805662147837982"); 
        const ms = new mSchema({
            rank: AC.memberCount + 1,
            name: member.nickname,
            userID: member.id,
            level: 0,
            coolDown: false,
            toNextLevel: 50,
            xp: 0
        })
        await ms.save();
        const logs = await AC.channels.cache.get("848592231391559710");
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${member.username} has joined the server!`)
            .setThumbnail(member.user.avatarURL())
            .setTimestamp();
        return logs.send(embed);
    }
}