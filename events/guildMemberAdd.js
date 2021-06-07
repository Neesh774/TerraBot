const Discord = require('discord.js');
const config = require('../config.json');
const mSchema = require('../models/memberschema.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client){
        const AC = await client.guilds.fetch(config.AC); 
        const ms = new mSchema({
            rank: AC.memberCount + 1,
            name: member.nickname,
            userID: member.id,
            level: 0,
            coolDown: false,
            toNextLevel: 50,
            xp: 0,
            levelxp: 0,
            muted: 0,
            starboards: 0
        })
        await ms.save();
        const logs = await AC.channels.cache.get(config.logs);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${member.username} has joined the server!`)
            .setThumbnail(member.user.avatarURL())
            .setTimestamp();
        return logs.send(embed);
    }
}