const config = require('./config.json');
const Discord = require('discord.js');
const ms = require('ms');
const wSchema = require('./models/warnSchema.js');
const mSchema = require('./models/memberschema.js');
const mcSchema = require('./models/mchannelschema.js');
const lrSchema = require('./models/levelroleschema.js');
const rrschema = require('./models/rrschema');
const sSchema = require('./models/suggestschema');
const sbSchema = require('./models/starboard');
module.exports = {
	getMember: async function(id, client, guild) {
		return await guild.members.fetch(id);
	},
	formatDate: function(date) {
		return new Intl.DateTimeFormat('en-US').format(date);
	},
	warn: async function(member, guild, channel, reason, client) {
		let wModel;
		wModel = await wSchema.findOne({ warnedID: member.id });
		if(!wModel) {
			wModel = new wSchema({
				numberWarns: 0,
				reasons: [],
				warned: member.user.username,
				warnedID: member.id,
			});
			await wModel.save();
		}
		const AC = await client.guilds.fetch(config.AC);
		const logs = await AC.channels.cache.get(config.logs);

		wModel.numberWarns++;
		await wModel.save();
		if(!reason) {
			reason = 'N/A';
		}
		wModel.reasons.push(reason);
		await wModel.save();
		if(wModel.numberWarns == 1) {
			member.send({ content: `You have been warned for the first time in **${guild.name}** for ${reason || 'N/A'}. If you get warned again you will be muted for 2 hours.` });
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.username} was warned`)
				.setDescription(`**${member.user.username}** was warned in ${channel.name} for reason ${reason}. They now have 1 warning.`);
			logs.send({ embeds: [embed] });
			channel.send({ content: `**${member.user.username}** was warned for the first time for reason: ${reason}.` });
		}
		if(wModel.numberWarns == 2) {
			member.send({ content: `You have been warned for the second time in **${guild.name}** for ${reason || 'N/A'}. You were muted for 2 hours.` });
			const mute = member.guild.roles.cache.find(role => role.name === config.mutedRole);
			member.roles.add(mute);
			setTimeout(function() {
				member.roles.remove(mute);
			}, (2 * 60 * 60 * 1000));
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.user.username} was warned`)
				.setDescription(`**${member.user.username}** was warned for the second time in ${channel.name} for reason ${reason}.`);
			logs.send({ embeds: [embed] });
			channel.send({ content: `**${member.user.username}** was warned for the second time for reason: ${reason}. They were muted for 2 hours.` });
		}
		else if(wModel.numberWarns == 3) {
			member.send({ content: `You have been warned in **${guild.name}** for ${reason}. If you get warned again you will be kicked.` });
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.username} was warned`)
				.setDescription(`**${member.user.username}** was warned in ${channel.name} for reason ${reason}. They now have 3 warnings.`);
			logs.send({ embeds: [embed] });
			channel.send({ content: `**${member.user.username}** was warned for the third time for reason: ${reason}.` });
		}
		else if(wModel.numberWarns == 4) {
			const sembed2 = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setDescription(`You Have Been Kicked From **${guild.name}** for - ${reason || 'N/A'}`)
				.setFooter(member.guild.name, member.guild.iconURL());
			member.send({ embeds: [sembed2] }).then(() =>{
				if(member.kickable()) {
					member.kick().catch(() => null);
					channel.send({ content: `**${member.user.username}** was warned for the fourth time for reason: ${reason}. They were kicked.` });
				}
				else{
					channel.send({ content: 'Couldn\'t kick that user, they were still warned.' });
				}
			});
			const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.username} was warned`)
				.setDescription(`**${member.user.username}** was warned in ${channel.name} for reason ${reason}. They now have 4 warnings. They were kicked.`);
			logs.send({ embeds: [embed] });
		}
	},
	sendCustomCommand: async function(message, client) {
		const prefix = config.prefix;
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		const ccSchema = require('./models/ccschema');
		const schema = await ccSchema.findOne({ trigger: cmd });
		if(!schema) {
			return false;
		}
        if(client.ccCoolDowns.has(schema.id)) {
			return message.reply('That command is on cooldown!').then(msg => msg.delete({ timeout: 5000 }));
		}
		const responses = schema.responsesArray;
		const ranInt = Math.floor(Math.random() * responses.length);
		try{
            client.ccCoolDowns.add(schema.id);
			setTimeout(() => {client.ccCoolDowns.delete(schema.id);}, 5 * 1000);
			return message.reply({ content: responses[ranInt], allowedMentions: { repliedUser: false } });
		}
		catch(e) {
			console.log(e.stack);
		}
	},
	connectMongoose: async function(mongoose) {
		await mongoose.connect(config.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
	},
	sendAutoResponse: async function(message, client) {
		const arSchema = require('./models/arschema');
		const schema = await arSchema.findOne({ trigger: message });
		if(!schema) {
			return false;
		}
        if(client.autoResponseCoolDowns.has(schema.id)) {
			return message.reply('That auto response is on cooldown!').then(msg => msg.delete({ timeout: 5000 }));
		}
		const responses = schema.responsesArray;
		const ranInt = Math.floor(Math.random() * responses.length);
		try{
            client.autoResponseCoolDowns.add(schema.id);
			setTimeout(() => {client.autoResponseCoolDowns.delete(schema.id);}, 5 * 1000);
			return message.reply({ content: responses[ranInt], allowedMentions: { repliedUser: false } });
		}
		catch(e) {
			console.log(e.stack);
		}
	},
	setReminder: async function(author, time, content) {
		setTimeout(() => {author.send({ content: `You told me to remind you to \`${content}\`` });}, ms(time));
	},
	setCoolDown: async function(profile) {
		profile.coolDown = false;
		await profile.save();
	},
	getXP: async function(level) {
		return Math.floor(50 * level);
	},
	getTime: function(time, hoffset, moffset) {
		let hour = parseInt(time.substring(0, 2));
		let minute = parseInt(time.substring(3));
		hour += hoffset;
		minute += moffset;
		if(minute > 60) {
			hour++;
			minute -= 60;
		}
		if(minute < 10) {
			minute = `0${minute}`;
		}
		if(hour > 12) {
			hour -= 12;
			time = `${hour}:${minute} PM`;
		}
		else if(hour < 1) {
			hour += 12;
			time = `${hour}:${minute} PM`;
		}
		else{
			time = `${hour}:${minute} AM`;
		}
		return time;
	},
	levelUser: async function(message, client) {
		const mc = await mcSchema.findOne({ channel: message.channel.id });
		const og = await mSchema.exists({ userID: message.author.id });
		if(message.author.bot || mc) {
			return;
		}
		if(!og) {
			await this.createUserProfile(message.author);
		}
		const profile = await mSchema.findOne({ userID: message.author.id });
		if(profile.muted) {
			return;
		}
		if(!client.coolDowns.has(profile.userID)) {
			const ranXP = Math.floor((Math.random() * 5) + 1);
			const nextLevelXP = await this.getXP(profile.level + 1);
			const currentLevelXP = await this.getXP(profile.level);
			const nextLevel = profile.level + 1;
			const levelXP = profile.xp - currentLevelXP;
			profile.xp += ranXP;
			await profile.save();
			if(ranXP + profile.xp > nextLevelXP) { // level up
				profile.level++;
				const lr = await lrSchema.findOne({ level: nextLevel });
				let field;
				const embed = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setTitle('CONGRATS!')
					.setDescription(`${message.author.toString()} just leveled up to level ${nextLevel}!`)
					.setImage('https://octoperf.com/img/blog/minor-version-major-features/level-up.gif');
				if(lr) {
					await message.member.roles.add(lr.roleID);
					const guild = await client.guilds.fetch(config.AC);
					const role = await guild.roles.fetch(lr.roleID);
					const lrPing = role.toString();
					embed.addField('Awarded Roles', lrPing);
				}
				message.reply({ embeds: [embed] });
			}
			await profile.save();
			client.coolDowns.add(profile.userID);
			setTimeout(() => {client.coolDowns.delete(profile.userID);}, 60 * 1000);
		}
	},
	createUserProfile: async function(user){
		const mss = new mSchema({
			name: user.username,
			userID: user.id,
			level: 1,
			xp: 0,
			muted: false,
			starboards: 0,
		});
		await mss.save();
	},
	cacheMessages: async function(client){
		const reactionRoles = await rrschema.find({});
		reactionRoles.forEach((rr) => {
			client.channels.fetch(rr.channelID).then(async (channel) =>{
				await channel.messages.fetch(rr.messageID);
			})
		});
		console.log("Cached all reaction roles!");
		const suggestions = await sSchema.find({});
		const PS = await client.guilds.fetch(config.PS);
		const suggest = await PS.channels.cache.get(config.suggestions);
		suggestions.forEach((s) => {
			suggest.messages.fetch(s.messageID)
		});
		console.log("Cached all suggestions!");
		const starboards = await sbSchema.find({});
		starboards.forEach((sb) => {
			client.channels.fetch(sb.channelID).then(async (channel) =>{
				await channel.messages.fetch(sb.messageID);
			})
		});
		console.log("Cached all starboards!");
		
	}
};