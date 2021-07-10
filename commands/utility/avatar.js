const Discord = require('discord.js')
const config = require('../../config.json');

module.exports = {
    name: 'avatar',
    category: 'utility',
    description: 'Gets the avatar of a user or yourself',
    usage: `${config.prefix}avatar [user]`,
    run: async (client, message, args) => {

        // command

        /* If user isnt found it selects ur profile */
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

        if (!member.user.avatarURL) return message.channel.send({ content: 'That user does not have an avatar' });

        const avatar = new Discord.MessageEmbed()
			.setTitle(`${member.user.username}'s Avatar`)
            .setColor(config.embedColor)
            .setImage(member.user.avatarURL())
            .setColor(member.displayHexColor)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setURL(member.user.avatarURL())
        message.channel.send({ embeds: [avatar] })
            // If bot doesnt have embed perms
            .catch(() => message.channel.send({ content: '**Error:** Missing permission `Embed link` ' }));

    },

};