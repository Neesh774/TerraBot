const Discord = require('discord.js');
const config = require('../config.json');
const Canvas = require("canvas");
const mSchema = require('../models/memberschema.js');
const path = require('path');
const { registerFont, createCanvas } = require('canvas');
registerFont(path.resolve(__dirname, "../assets/project-solaris.ttf"), { family: 'Regular' })

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client){
        const PS = await client.guilds.fetch(config.PS); 
        const ms = new mSchema({
            rank: PS.memberCount + 1,
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

        const canvas = Canvas.createCanvas(3840, 2560);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(path.resolve(__dirname, "../assets/welcome.png"));
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      // ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      ctx.font = '91px "regular"';
      ctx.fillStyle = '#36212e';
      ctx.fillText(textString3, 1500, canvas.height / 2 - 60);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(850, canvas.height / 2 - 50, 350, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 500, canvas.height / 2 - 400, 700, 700);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTimestamp()
        .setFooter("TerraBot Info", member.guild.iconURL({ dynamic: true }))
        .addField(`${member.user.username}, Welcome to the Project Solaris Discord!`, `The server now has ${member.guild.memberCount} members.`, true)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);
      //define the welcome channel
      const channel = member.guild.channels.cache.find(channel => channel.id === config.welcome);
      //send the welcome embed to there
      channel.send(welcomeembed);

        const logs = await PS.channels.cache.get(config.logs);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`${member.user.username} has joined the server!`)
            .setThumbnail(member.user.avatarURL())
            .setTimestamp();
        return logs.send(embed);
    }
}