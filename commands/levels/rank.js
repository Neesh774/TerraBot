const Discord = require("discord.js");
const config = require("../../config.json");
const mSchema = require('../../models/memberschema.js');
const canvacord = require('canvacord');
const functions = require("../../functions.js");
module.exports = {
    name: "rank",
    category: "levels",
    description: "TerraBot tells you what level you're at",
    usage: `${config.prefix}rank [user]`,
    run: async (client, message, args) => {
        let member = await mSchema.findOne({userID: message.user.id});
        let user = message.user;
        if(args[0]){
            user = args[0];
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
        let currentlevelXP = await functions.getXP(member.level);
        let nextLevelXP = await functions.getXP(member.level + 1);
        const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({format: "png", dynamic: "false"}))
            .setCurrentXP(member.xp - currentlevelXP)
            .setRequiredXP(nextLevelXP - currentlevelXP)
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
            message.reply({files: [attachment]});
        });
    }
};