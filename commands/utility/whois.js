    const Discord = require('discord.js')
    const config = require('../../config.json');

    module.exports = {
    name: 'userinfo',
    category: 'utility',
    description: 'Get information about a user',
    usage: `${config.prefix}userinfo [user]`,
    run: async (client, message, args) => {
        const PS = await client.guilds.fetch(config.PS);
        let user = await PS.members.fetch(args[0]);
        if(!args[0]){
            user = message.author;
        }

        var playing = ('[ ' + user.presence.activities + ' ]')

        const person = new Discord.MessageEmbed()
            .setTitle('User Info:')
            .addField('Full Username', `${user.tag}`)
            .addField('ID', user.id)
            .addField('Playing', playing, true)
            .addField('Status', `${user.presence.status}`, true)
            .addField('Joined Discord At', user.createdAt.toString())
            .setColor(config.embedColor)
            .setTimestamp()
            .setThumbnail(user.avatarURL())
        message.channel.send({ embeds: [person] })
        },
    };