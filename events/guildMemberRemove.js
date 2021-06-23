const Discord = require('discord.js');
const config = require('../config.json');
const mSchema = require("../models/memberschema")
module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client){

        const userProfile = await mSchema.deleteOne({memberID: member.id});
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${member.user.username} has left the server`)
            .setThumbnail(member.user.avatarURL())
            .setTimestamp();
        return logs.send({embeds: [embed]});
    }
}