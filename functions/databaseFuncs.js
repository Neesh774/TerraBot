const Discord = require('discord.js');
const mSchema = require('../models/memberschema.js');
const config = require('../config.json');
const token = require('../token.json');
const rrSchema = require('../models/rrschema');
const sSchema = require('../models/suggestschema');
const sbSchema = require('../models/starboard');

module.exports = {
    warn: async function(member, guild, channel, reason, client, message, interaction) {
		let wModel;
		wModel = await mSchema.findOne({ userID: member.id });
		if (!wModel) {
			wModel = await this.createMember(member.user.username, member.id);
		}
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
        let logEmb;
        let reply;
		wModel.numberWarns++;
		await wModel.save();
		if (!reason) {
			reason = 'N/A';
		}
		wModel.warnReasons.push(reason);
		await wModel.save();
		console.log(wModel.numberWarns);
		if (wModel.numberWarns == 1) {
			member.send(`You have been warned for the first time in **${guild.name}** for ${reason || 'N/A'}. If you get warned again you will be muted for 2 hours.`);
			logEmb = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.user.username} was warned`)
				.setDescription(`${member.user.toString()} was warned in ${channel.toString()} for reason ${reason}. They now have 1 warning.`);
			reply = `**${member.user.username}** was warned for the first time for reason: ${reason}.`;
		}
		if (wModel.numberWarns == 2) {
			member.send(`You have been warned for the second time in **${guild.name}** for ${reason || 'N/A'}. You were muted for 2 hours.`);
			const mute = await member.guild.roles.fetch(config.mutedRole);
			member.roles.add(mute).catch(() => null);
			setTimeout(function() {
				member.roles.remove(mute);
			}, (2 * 60 * 60 * 1000));
			logEmb = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.user.username} was warned`)
				.setDescription(`**${member.user.username}** was warned for the second time in ${channel.toString()} for reason ${reason}.`);
			reply = `**${member.user.username}** was warned for the second time for reason: ${reason}. They were muted for 2 hours.`;
		}
		else if (wModel.numberWarns == 3) {
			member.send(`You have been warned in **${guild.name}** for ${reason}. If you get warned again you will be kicked.`);
            logEmb = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.username} was warned`)
				.setDescription(`**${member.user.username}** was warned in ${channel.toString()} for reason ${reason}. They now have 3 warnings.`);
			reply = `**${member.user.username}** was warned for the third time for reason: ${reason}.`;
		}
		else if (wModel.numberWarns == 4) {
			const sembed2 = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setDescription(`You Have Been Kicked From **${guild.name}** for - ${reason || 'N/A'}`)
				.setFooter(guild.name, guild.iconURL());
			member.send({ embeds: [sembed2] }).then(() => {
                member.kick().catch(() => message.editReply('Couldn\'t kick that user, they were still warned.'));
                reply = `**${member.user.username}** was warned for the fourth time for reason: ${reason}. They were kicked.`;
			});
			logEmb = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.user.username} was warned`)
				.setDescription(`**${member.user.username}** was warned in ${channel.toString()} for reason ${reason}. They now have 4 warnings. They were kicked.`);
		}
        else {
            member.send(`You have been warned in Arcade Cafe for reason ${reason || 'N/A'}`);
            logEmb = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setThumbnail(member.user.avatarURL())
				.setTitle(`${member.user.username} was warned`)
				.setDescription(`**${member.user.username}** was warned in ${channel.toString()} for reason ${reason || 'N/A'}. They now have ${wModel.numberWarns} warnings.`);
        }
        logs.send({ embeds: [logEmb] });
        return interaction ? message.editReply({ content: reply, ephemeral: true }) : '';
	},
    connectMongoose: async function(mongoose) {
		await mongoose.connect(token.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
	},
    cacheMessages: async function(client) {
		const reactionRoles = await rrSchema.find({});
		reactionRoles.forEach((rr) => {
			client.channels.fetch(rr.channelID).then(async (channel) => {
				await channel.messages.fetch(rr.messageID).catch(async () => {
					console.log(`Failed to fetch reaction role with ID ${rr.messageID}`);
					await rr.remove();
				});
			}).catch(async () => {
				console.log(`Failed to fetch channel with ID ${rr.channelID}`);
				await rr.remove();
			});
		});
		console.log('Cached all reaction roles!');
		const suggestions = await sSchema.find({});
		const PS = await client.guilds.fetch(config.PS);
		const suggest = await PS.channels.cache.get(config.suggestions);
		suggestions.forEach(async (s) => {
			await suggest.messages.fetch(s.messageID).catch(async () => {
				console.log(`Failed to fetch suggestion with ID ${s.messageID}`);
				await s.remove();
			});
		});
		console.log('Cached all suggestions!');
		const starboards = await sbSchema.find({});
		starboards.forEach((sb) => {
			client.channels.fetch(sb.channelID).then(async (channel) => {
				await channel.messages.fetch(sb.messageID).catch(async () => {
					console.log(`Failed to fetch starboard with ID ${sb.messageID}`);
					await sb.remove();
				});
			});
		});
		console.log('Cached all starboards!');
	},
    createMember: async function(username, id) {
        const mS = new mSchema({
            name: username,
            userID: id,
            level: 1,
            xp: 0,
            muted: false,
            starboards: 0,
            numberWarns: 0,
            warnReasons: [],
        });
        await mS.save();
    },
};