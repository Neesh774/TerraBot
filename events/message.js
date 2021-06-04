const Discord = require('discord.js');
const config = require('C:/Users/kkanc/Beano/config.json');
const mSchema = require('C:/Users/kkanc/Beano/models/memberschema.js');
const mcSchema = require('C:/Users/kkanc/Beano/models/mchannelschema.js');
const functions = require('C:/Users/kkanc/Beano/functions.js');
module.exports = {
    name: 'message',
    async execute(message, client){
        const mc = await mcSchema.findOne({channelID: message.channel.id});
        let profile = await mSchema.findOne({userID: message.author.id});
        if(message.author.bot || mc){
            return;
        }
        if(!profile){
            const AC = await client.guilds.fetch("833805662147837982"); 
            let ms = new mSchema({
                name: message.author.username,
                userID: message.author.id,
                level: 0,
                coolDown: false,
                toNextLevel: 50,
                xp: 0,
                muted: false
            });
            await ms.save();
        }
        profile = await mSchema.findOne({userID: message.author.id});
        if(!profile.coolDown && !profile.muted){
            let ranXp = Math.floor(Math.random() * 4) + 1; //random xp between 1 and 5
            if(ranXp >= profile.toNextLevel){ //moving to next level
                ranXp -= profile.toNextLevel;
                profile.xp += ranXp;
                let level = profile.level + 1;
                profile.level ++;
                profile.toNextLevel =  Math.floor((Math.log10(((level+1) * 1.3) + 1) * 100)) - profile.xp; //xp for next level = log(2.3(level) + 1)
                await profile.save();
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("YOOO!")
                    .setDescription(`Epic! ${message.author.toString()} just leveled up to ${profile.level}!!! The Coffee Gods approve of your ascension`)
                    .setAuthor(message.author.tag, message.author.avatarURL())
                return message.channel.send(embed);
            }
            else{
                profile.xp+= ranXp;
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