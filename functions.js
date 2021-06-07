const warnings = require('./warnings.json');
const config = require('./config.json');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const wSchema = require('./models/warnSchema.js');
module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },
    warn: async function(member, guild, channel, reason, client){
        let wModel;
        wModel = await wSchema.findOne({warnedID: member.id});
        if(!wModel){
            wModel = new wSchema({
                numberWarns: 0,
                reasons: [],
                warned: member.user.username,
                warnedID: member.id
            });
            await wModel.save();
        }
        const AC = await client.guilds.fetch(config.AC); 
        const logs = await AC.channels.cache.get(config.logs);

        wModel.numberWarns ++;
        await wModel.save();
        if(!reason){
            reason = "N/A";
        }
        wModel.reasons.push(reason);
        await wModel.save();
        if(wModel.numberWarns == 1){
            member.send(`You have been warned for the first time in Arcade Cafe for ${reason || "N/A"}. If you get warned again you will be muted for 2 hours.`)
            let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`${member.user.username} was warned in ${channel.name} for reason ${reason}. They now have 1 warning.`)
            logs.send(embed);
            channel.send(`${member.user.username} was warned for the first time for reason: ${reason}.`)
        }
        if(wModel.numberWarns == 2){
            member.send(`You have been warned for the second time in Arcade Cafe for ${reason || "N/A"}. You were muted for 2 hours.`)
            let mute= member.guild.roles.cache.find(role => role.name === config.mutedRole);
            member.roles.add(mute);
            setTimeout(function(){
                member.roles.remove(mute);
            }, (2 * 60 * 60 * 1000));
            let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.user.username} was warned`)
                .setDescription(`${member.user.username} was warned for the second time in ${channel.name} for reason ${reason}.`)
            logs.send(embed);
            channel.send(`${member.user.username} was warned for the second time for reason: ${reason}. They were muted for 2 hours.`)
        }
        else if(wModel.numberWarns == 3){
            member.send(`You have been warned in Arcade Cafe for ${reason || "N/A"}. If you get warned again you will be kicked.`);
            let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`${member.user.username} was warned in ${channel.name} for reason ${reason}. They now have 3 warnings.`)
            logs.send(embed);
            channel.send(`${member.user.username} was warned for the third time for reason: ${reason}.`)
        }
        else if(wModel.numberWarns == 4){
            const sembed2 = new MessageEmbed()
                    .setColor(config.embedColor)
                    .setDescription(`**You Have Been Kicked From ${message.guild.name} for - ${reason || "N/A"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                member.send(sembed2).then(() =>{
                    if(member.kickable()){
                        member.kick().catch(() => null);
                        channel.send(`${member.user.username} was warned for the fourth time for reason: ${reason}. They were kicked.`)
                    }
                    else{
                        channel.send("Couldn't kick that user, they were still warned.");
                    }
                })
                let embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`${member.user.username} was warned in ${channel.name} for reason ${reason}. They now have 4 warnings. They were kicked.`)
                logs.send(embed);
        }
    },
    sendCustomCommand: async function(message){
        let prefix = config.prefix;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const ccSchema = require("C:/Users/kkanc/Beano/models/ccschema.js");
        const schema = await ccSchema.findOne({trigger: cmd});
        if(!schema){
            return false;
        }
        let responses = schema.responsesArray;
        let ranInt = Math.floor(Math.random() * responses.length);
        try{
            return message.channel.send(responses[ranInt]);
        }
        catch(e){
            console.log(e.stack);
            return message.channel.send("There was an error. Please contact staff about it and try again.");
        }
    },
    connectMongoose: async function(mongoose){
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });
    },
    sendAutoResponse: async function(message){
        const arSchema = require("C:/Users/kkanc/Beano/models/arschema.js");
        const schema = await arSchema.findOne({trigger: message});
        if(!schema){
            return false;
        }
        let responses = schema.responsesArray;
        let ranInt = Math.floor(Math.random() * responses.length);
        try{
            return message.channel.send(responses[ranInt]);
        }
        catch(e){
            console.log(e.stack);
            return message.channel.send("There was an error. Please contact staff about it and try again.");
        }
    },
    setReminder: async function(message, time, content){
        if (!time) return message.reply("When should I remind you?");

        let response = `Okily dokily ${message.user.username}, I'll remind you in ${time}`;
        if(content) response += `to ${content}`;    
        message.reply(response);

        // Create reminder time out
        setTimeout(() => {message.reply("Reminder to " + content)}, ms(time));
    },
    setCoolDown: async function(profile){
        profile.coolDown = false;
        await profile.save();
    },
    getXP: async function(level){
        return Math.floor(Math.log(level**2 + 1)*100);
    },
    getLevel: async function(xp){
        return Math.floor(Math.cbrt((10**xp - 1)));
    }
};