const Discord = require('discord.js');
const config = require('C:/Users/kkanc/Beano/config.json');
const mSchema = require('C:/Users/kkanc/Beano/models/memberschema.js');
const mcSchema = require('C:/Users/kkanc/Beano/models/mchannelschema.js');
const lrSchema = require('C:/Users/kkanc/Beano/models/levelroleschema.js');
const functions = require('C:/Users/kkanc/Beano/functions.js');
module.exports = {
    name: 'message',
    async execute(message, client){
        const mc = await mcSchema.findOne({channelID: message.channel.id});
        let og = await mSchema.exists({userID: message.author.id});
        if(message.author.bot || mc){
            return;
        }
        if(!og){
            let ms = new mSchema({
                name: message.author.username,
                userID: message.author.id,
                level: 0,
                coolDown: false,
                toNextLevel: 50,
                xp: 0,
                levelxp: 0,
                muted: false,
                starboards: 0
            });
            ms.isNew = true;
            await ms.save();
        }
        let profile = await mSchema.findOne({userID: message.author.id});
        if(!profile.coolDown && !profile.muted){
            let ranXp = Math.floor(Math.random() * 4) + 1; //random xp between 1 and 5
            if(ranXp >= profile.toNextLevel){ //moving to next level
                profile.xp += ranXp;
                ranXp -= profile.toNextLevel;
                profile.levelxp += ranXp;
                let level = profile.level + 1;

                let lr = await lrSchema.findOne({level: level});
                let field;
                if(lr){
                    message.member.roles.add(lr.roleID);
                    field = {"name": "Awarded Roles", "value": `<@${lr.roleID}>`};
                }
                profile.level ++;
                profile.toNextLevel =  await functions.getXP(level) - profile.levelxp;
                await profile.save();
                let embed;
                if(field){
                    embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("YOOO!")
                    .setDescription(`Epic! ${message.author.toString()} just leveled up to ${profile.level}!!! The Coffee Gods approve of your ascension`)
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .addField(field)
                    .setImage("https://octoperf.com/img/blog/minor-version-major-features/level-up.gif");
                }
                else{
                    embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("YOOO!")
                    .setDescription(`Epic! ${message.author.toString()} just leveled up to ${profile.level}!!! The Coffee Gods approve of your ascension`)
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setImage("https://octoperf.com/img/blog/minor-version-major-features/level-up.gif")
                }
                return message.channel.send(embed);
            }
            else{
                profile.levelxp+= ranXp;
                profile.xp += ranXp;    
                profile.toNextLevel -= ranXp;
                await profile.save();
            }
            profile.coolDown = true;
            setTimeout(() =>{
                functions.setCoolDown(profile);
            }, 60 * 1000)
            await profile.save();
        }
    }
}