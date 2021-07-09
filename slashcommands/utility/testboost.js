const Discord = require('discord.js')
const config = require('../../config.json');
const path = require('path');
const { registerFont, createCanvas } = require('canvas');
registerFont(path.resolve(__dirname, '../../assets/project-solaris.ttf'), { family: 'Regular' })
const Canvas = require('canvas');

module.exports = {
    name: 'testboost',
    aliases: ['info'],
    category: 'utility',
    description: 'Test boost',
    options: [],
    usage: `${config.prefix}testboost`,
    run: async (client, message, args) => {
        const PS = await client.guilds.fetch(config.PS);
        const member = message.member;
        const canvas = Canvas.createCanvas(3000, 1620);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(path.resolve(__dirname, '../../assets/boost.png'));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        var textString3 = `${member.user.username}`;
        ctx.font = '130px "regular"';
        ctx.fillStyle = '#36212e';
        ctx.textAlign = 'center';
        ctx.fillText(textString3, 1500, 970, 1900);

        ctx.beginPath();
        ctx.arc(320, 915, 180, 0, Math.PI * 2, true);// position of img
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 140, 735, 360, 360);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'boost-image.png');

        const welcomeembed = new Discord.MessageEmbed()
          .setColor(config.embedColor)
          .setTimestamp()
          .setFooter('TerraBot Info', member.guild.iconURL({ dynamic: true }))
          .addField(`${member.user.username}, Thanks for boosting!`, `The server now has ${PS.premiumSubscriptionCount} boosts, and is on tier ${PS.premiumTier}`, true)
          .setImage('attachment://boost-image.png')
        // define the welcome channel
        // send the welcome embed to there
        message.reply({ embeds: [welcomeembed], files: attachment });
        // embed = new Discord.MessageEmbed()
        //         .setColor(config.embedColor)
        //         .setTimestamp()
        //         .setDescription(`${member.user.username} boosted the server! We now have ${PS.premiumSubscriptionCount} boosts, and are on tier ${PS.premiumTier}.`)
        //         .setThumbnail(member.user.avatarURL());
        // const logs = PS.channels.cache.get(config.logs);
        // logs.send({embeds: [embed]});
    },
};