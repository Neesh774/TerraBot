const Discord = require("discord.js");
const config = require("../../config.json");
const mSchema = require('../../models/memberschema.js');
const canvacord = require('canvacord');
module.exports = {
    name: "rank",
    category: "levels",
    description: "TerraBot tells you what level you're at",
    usage: `${config.prefix}rank [user]`,
    run: async (client, message, args) => {
        let member = await mSchema.findOne({userID: message.author.id});
        let user = message.author;
        if(args[0]){
            user = message.mentions.members.first().user || message.guild.members.cache.fetch(args[0]);
            if (!user) return message.channel.send(`:x: | **User Not Found**`);
            member = await mSchema.findOne({userID: user.id});
        }
        const list = await mSchema.find();
        let mRank = list.sort((a, b) => {
            return b.xp - a.xp;
          });
        try{
          mRank = mRank.map(x => x.xp).indexOf(member.xp) +1;
        }
        catch(e){
            return message.reply("I can't find that user.");
        }
        const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({dynamic: true}))
            .setCurrentXP(member.levelxp)
            .setRequiredXP(member.levelxp + member.toNextLevel)
            .setStatus(user.presence.status)
            .renderEmojis(true)
            .setProgressBar("#3eafa7", "COLOR")
            .setUsername(user.username)
            .setRank(mRank)
            .setLevel(member.level)
            .setDiscriminator(user.discriminator);

    rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });
    }
};