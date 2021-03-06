/* eslint-disable no-unused-vars */
const config = require('./config.json');
const Discord = require('discord.js');
const ms = require('ms');
const wSchema = require('./models/warnSchema.js');
const mSchema = require('./models/memberschema.js');
const mcSchema = require('./models/mchannelschema.js');
const lrSchema = require('./models/levelroleschema.js');
module.exports = {
	getMember: function(message, toFind = '') {
		toFind = toFind.toLowerCase();

		let target = message.guild.members.get(toFind);

		if (!target && message.mentions.members) {target = message.mentions.members.first();}

		if (!target && toFind) {
			target = message.guild.members.find(member => {
				return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind);
			});
		}

		if (!target) {target = message.member;}

		return target;
	},

	formatDate: function(date) {
		return new Intl.DateTimeFormat('en-US').format(date);
	},

	promptMessage: async function(message, author, time, validReactions) {
		// We put in the time as seconds, with this it's being transfered to MS
		time *= 1000;

        wModel.numberWarns ++;
        await wModel.save();
        if(!reason){
            reason = "N/A";
        }
        wModel.reasons.push(reason);
        await wModel.save();
        if(wModel.numberWarns == 1){
            member.send(`You have been warned for the first time in **${guild.name}** for ${reason || "N/A"}. If you get warned again you will be muted for 2 hours.`)
            let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`**${member.user.username}** was warned in ${channel.name} for reason ${reason}. They now have 1 warning.`)
            logs.send(embed);
            channel.send(`**${member.user.username}** was warned for the first time for reason: ${reason}.`)
        }
        if(wModel.numberWarns == 2){
            member.send(`You have been warned for the second time in **${guild.name}** for ${reason || "N/A"}. You were muted for 2 hours.`)
            let mute= member.guild.roles.cache.find(role => role.name === config.mutedRole);
            member.roles.add(mute);
            setTimeout(function(){
                member.roles.remove(mute);
            }, (2 * 60 * 60 * 1000));
            let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.user.username} was warned`)
                .setDescription(`**${member.user.username}** was warned for the second time in ${channel.name} for reason ${reason}.`)
            logs.send(embed);
            channel.send(`**${member.user.username}** was warned for the second time for reason: ${reason}. They were muted for 2 hours.`)
        }
        else if(wModel.numberWarns == 3){
            member.send(`You have been warned in **${guild.name}** for ${reason}. If you get warned again you will be kicked.`);
            let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`**${member.user.username}** was warned in ${channel.name} for reason ${reason}. They now have 3 warnings.`)
            logs.send(embed);
            channel.send(`**${member.user.username}** was warned for the third time for reason: ${reason}.`)
        }
        else if(wModel.numberWarns == 4){
            const sembed2 = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setDescription(`You Have Been Kicked From **${guild.name}** for - ${reason || "N/A"}`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                member.send(sembed2).then(() =>{
                    if(member.kickable()){
                        member.kick().catch(() => null);
                        channel.send(`**${member.user.username}** was warned for the fourth time for reason: ${reason}. They were kicked.`)
                    }
                    else{
                        channel.send("Couldn't kick that user, they were still warned.");
                    }
                })
                let embed = new Discord.MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(member.user.avatarURL())
                .setTitle(`${member.username} was warned`)
                .setDescription(`**${member.user.username}** was warned in ${channel.name} for reason ${reason}. They now have 4 warnings. They were kicked.`)
                logs.send(embed);
        }
    },
    sendCustomCommand: async function(message, client){
        let prefix = config.prefix;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const ccSchema = require("./models/ccschema");
        const schema = await ccSchema.findOne({trigger: cmd});
        if(!schema){
            return false;
        }
        if(client.ccCoolDowns.has(schema.id)){
            return message.reply("That command is on cooldown!").then(msg => msg.delete({timeout: 5000}));
        }
        let responses = schema.responsesArray;
        let ranInt = Math.floor(Math.random() * responses.length);
        try{
            client.ccCoolDowns.add(schema.id);
            setTimeout(() => {client.ccCoolDowns.delete(schema.id)}, 5*1000);
            return message.channel.send(responses[ranInt]);
        }
        catch(e){
            console.log(e.stack);
            return message.channel.send(":x: There was an error. Please make sure you're using the proper arguments and try again.");
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
    sendAutoResponse: async function(message, client){
        const arSchema = require("./models/arschema");
        const schema = await arSchema.findOne({trigger: message});
        if(!schema){
            return false;
        }
        if(client.autoResponseCoolDowns.has(schema.id)){
            return message.reply("That auto response is on cooldown!").then(msg => msg.delete({timeout: 5000}));
        }
        let responses = schema.responsesArray;
        let ranInt = Math.floor(Math.random() * responses.length);
        try{
            client.autoResponseCoolDowns.add(schema.id);
            setTimeout(() => {client.autoResponseCoolDowns.delete(schema.id)}, 5*1000);
            return message.channel.send(responses[ranInt]);
        }
        catch(e){
            console.log(e.stack);
            return message.channel.send(":x: There was an error. Please make sure you're using the proper arguments and try again.");
        }
    },
    setReminder: async function(message, time, content){
        if (!time) return message.reply("When should I remind you?");

		// Only allow reactions from the author,
		// and the emoji must be in the array we provided.
		const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // Create reminder time out
        setTimeout(() => {message.reply("Reminder to " + content)}, ms(time));
    },
    setCoolDown: async function(profile){
        profile.coolDown = false;
        await profile.save();
    },
    getXP: async function(level){ 
        return Math.floor(50*level); 
    },
    levelUser: async function(message, client){
        const mc = await mcSchema.findOne({channel: message.channel.id});
        let og = await mSchema.exists({userID: message.author.id});
        if(message.author.bot || mc){
            return;
        }
        if(!og){
            let ms = new mSchema({
                name: message.author.username,
                userID: message.author.id,
                level: 1,
                xp: 0,
                muted: false,
                starboards: 0
            });
            await ms.save();
        }
        let profile = await mSchema.findOne({userID: message.author.id});
        if(profile.muted){
            return;
        }
        if(!client.coolDowns.has(profile.userID)){
            let ranXP = Math.floor((Math.random()*5) + 1);
            let nextLevelXP = await this.getXP(profile.level + 1);
            let currentLevelXP = await this.getXP(profile.level);
            let nextLevel = profile.level + 1;
            let levelXP = profile.xp - currentLevelXP;
            profile.xp += ranXP;
            await profile.save();
            if(ranXP + profile.xp > nextLevelXP){ //level up
                profile.level ++;
                let lr = await lrSchema.findOne({level: nextLevel});
                let field;
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("CONGRATS!")
                    .setDescription(`${message.author.toString()} just leveled up to level ${nextLevel}!`)
                    .setImage("https://octoperf.com/img/blog/minor-version-major-features/level-up.gif");
                if(lr){
                    await message.member.roles.add(lr.roleID);
                    let guild = await client.guilds.fetch(config.AC);
                    let role = await guild.roles.fetch(lr.roleID);
                    let lrPing = role.toString();
                    embed.addField("Awarded Roles", lrPing);
                }
                message.channel.send(embed);
            }
            await profile.save();
            client.coolDowns.add(profile.userID);
            setTimeout(() => {client.coolDowns.delete(profile.userID)}, 60 * 1000);
        }
    }
};