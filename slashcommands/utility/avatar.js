const Discord = require('discord.js')
const config = require('../../config.json');

module.exports = {
    name: 'avatar',
    category: 'utility',
    description: 'Gets the avatar of a user or yourself',
    usage: `${config.prefix}avatar [user]`,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user you want the avatar of',
            required: false,
        },
    ],
    run: async (client, message, args) => {

        // command

        /* If user isnt found it selects ur profile */
        let member = message.member;
        if(args[0]) member = await message.guild.members.fetch(args[0]);
        if (!member.user.avatarURL) return message.reply({ content: 'That user does not have an avatar' });

        const avatar = new Discord.MessageEmbed()
			.setTitle(`${member.user.username}'s Avatar`)
            .setColor(config.embedColor)
            .setImage(member.user.avatarURL())
            .setColor(member.displayHexColor)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setURL(member.user.avatarURL())
        message.reply({ embeds: [avatar] })
            // If bot doesnt have embed perms
            .catch(() => message.reply({ content: '**Error:** Missing permission `Embed link` ' }));

    },

};