const config = require('../config.json');
const ccSchema = require('../models/ccschema');
const arSchema = require('../models/arschema');
const hlSchema = require('../models/hlschema');
const ms = require('ms');
const Filter = require('badwords-filter');
const Discord = require('discord.js');
const { Client, Intents, Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const mSchema = require('../models/memberschema')
const tSchema = require('../models/ticket');
module.exports = {
    sendCustomCommand: async function(message, client) {
		const prefix = config.prefix;
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		const schema = await ccSchema.findOne({ trigger: cmd });
		if (!schema) {
			return false;
		}
		if (client.ccCoolDowns.has(schema.id)) {
			return message.reply('That auto response is on cooldown!').then(msg => setTimeout(() => msg.delete(), 5000));
		}
		const responses = schema.responsesArray;
		const ranInt = Math.floor(Math.random() * responses.length);
		try {
			client.ccCoolDowns.add(schema.id);
			setTimeout(() => {client.ccCoolDowns.delete(schema.id);}, 5 * 1000);
			return message.reply({ content: responses[ranInt], allowedMentions: { repliedUser: false } });
		}
		catch (e) {
			console.log(e.stack);
		}
	},
    sendAutoResponse: async function(message, client) {
		const schema = await arSchema.findOne({ trigger: message });
		if (!schema) {
			return false;
		}
		if (client.autoResponseCoolDowns.has(schema.id)) {
			return message.reply('That auto response is on cooldown!').then(msg => setTimeout(() => msg.delete(), 5000));
		}
		const responses = schema.responsesArray;
		const ranInt = Math.floor(Math.random() * responses.length);
		try {
			client.autoResponseCoolDowns.add(schema.id);
			setTimeout(() => {client.autoResponseCoolDowns.delete(schema.id);}, 5 * 1000);
			return message.reply({ content: responses[ranInt], allowedMentions: { repliedUser: false } });
		}
		catch (e) {
			console.log(e.stack);
		}
	},
    setReminder: async function(time, reminder, member, interaction) {
		const response = `Okily dokily ${member.user.username}, I'll remind you in ${time} to ${reminder}`;
		interaction.editReply(response);

		// Create reminder time out
		setTimeout(() => {member.user.send('Reminder to ' + reminder);}, ms(time));
	},
    setCoolDown: async function(profile) {
		profile.coolDown = false;
		await profile.save();
	},
	checkHighlight: async function(message, client) {
		const members = await hlSchema.find({ $text: { $search: message.content, $diacriticSensitive: true, $caseSensitive: false } });
		if (members.length > 0) {
			members.forEach(async (schema) => {
				const PS = await client.guilds.fetch(config.PS);
				const member = await PS.members.fetch(schema.userID);
				if (message.author.id == member.id) return;
				if (message.channel.id == schema.ignore) return;
				const embed = new Discord.MessageEmbed()
					.setColor(config.embedColor)
					.setTitle('Highlight Triggered')
					.setDescription(`**${message.author.username}:** ${message.content}`)
					.addField('Jump', `[Jump!](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
					.setTimestamp();
				member.user.send({ embeds: [embed], content: `In ${message.guild.name} ${message.channel.toString()}, you were mentioned with a highlight.` });
			});
		}
	},
	createTicket: async function(member, client, interaction) {
		const PS = await client.guilds.fetch(config.PS);
		const checkTicket = await tSchema.findOne( {memberID: member.id} );
		if (checkTicket) {
			return interaction.editReply({content: `You already have a ticket! Check it here: <#${checkTicket.channelID}>`, ephemeral: true})
		}
		const ticketChannel = await PS.channels.create(`ticket-${member.user.username}`, {
			type: 'GUILD_TEXT',
			topic: `Ticket for ${member.user.username} | ${member.id}`,
			parent: config.tickets,
			permissionOverwrites: [
				{ id: PS.roles.everyone, deny: [Permissions.FLAGS.VIEW_CHANNEL] },
				{ id: await PS.roles.fetch(config.staff), allow: [
					Permissions.FLAGS.VIEW_CHANNEL,
					Permissions.FLAGS.SEND_MESSAGES,
					Permissions.FLAGS.ATTACH_FILES,
					Permissions.FLAGS.EMBED_LINKS,
					Permissions.FLAGS.READ_MESSAGE_HISTORY,
				] },
				{ id: member, allow: [
					Permissions.FLAGS.VIEW_CHANNEL,
					Permissions.FLAGS.SEND_MESSAGES,
					Permissions.FLAGS.ATTACH_FILES,
					Permissions.FLAGS.EMBED_LINKS,
					Permissions.FLAGS.READ_MESSAGE_HISTORY,
				] },
			],
		});
		interaction.reply({ content: `Here's your ticket! ${ticketChannel.toString()}`, ephemeral: true });
		let roles = '';
		const ignoreRoles = [PS.roles.everyone.id];
		member.roles.cache.each(role => {
			if (!ignoreRoles.includes(role.id)) roles += `${role.toString()}, `;
		});
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle(`${member.user.username}'s Ticket'`)
			.setDescription(`${member.user.username}'s ticket has been created. Press the button below to close it.`)
			.addField('User', `${member.user.toString()} | ${member.id}`)
			.addField('Roles', roles);
		const button = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId(`ticketdelete ${ticketChannel.id}`)
				.setLabel('Close Ticket')
				.setStyle('DANGER'),
		);
		const message = await ticketChannel.send({ embeds: [embed], content: `<@${config.staff}> <@${member.id}>`, components: [button] });
		const ticketSchema = new tSchema({
			memberID: member.id,
			memberName: member.user.username,
			channelID: ticketChannel.id,
			ticketMessage: message.id,
		});
		await ticketSchema.save();
		const logs = await PS.channels.fetch(config.logs);
		const embed2 = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Ticket Created')
			.setDescription(`${member.user.username}'s ticket has been created. ${ticketChannel.toString()}`)
			.addField('User', `${member.user.toString()} | ${member.id}`)
			.setTimestamp();
		logs.send({ embeds: [embed2] });
	},
	deleteTicket: async function(interaction, channelId, client) {
		const PS = await client.guilds.fetch(config.PS);
		const ticket = await tSchema.findOne({ channelID: channelId });
		const ticketCreator = await PS.members.fetch(ticket.memberID);
		ticketCreator.send('Your ticket was closed.');
		if (ticket) {
			const ticketChannel = await PS.channels.fetch(ticket.channelID);
			await ticketChannel.delete();
			await ticket.delete();
		}
		const logs = await PS.channels.fetch(config.logs);
		const embed2 = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Ticket Closed')
			.setDescription(`${interaction.user.username}'s ticket was closed.`)
			.addField('User', `${interaction.user.toString()} | ${interaction.member.id}`)
			.setTimestamp();
		logs.send({ embeds: [embed2] });
	},
	checkBirthday: async function(client) {
		const members = await mSchema.find({ birthday: { $ne: null } });
		members.forEach(async (member) => {
			const today = new Date();
			const birthday = new Date(member.birthday);
			if (today.getMonth() == birthday.getMonth() && today.getDate() == birthday.getDate()) {
				const PS = await client.guilds.fetch(config.PS);
				const general = await PS.channels.fetch(config.general);
				const dMember = await PS.members.fetch(member.userID);
				const embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTitle(`Happy Birthday ${dMember.user.username}!`)
				.setFooter(`${dMember.user.username}`, dMember.user.displayAvatarURL());
				general.send({ embeds:[embed], content: dMember.user.toString() });
			}
		});
		// call checkBirthday after 24 hours
		setTimeout(() => {
			// eslint-disable-next-line no-undef
			this.checkBirthday(client);
		}, 1000 * 60 * 60 * 24);
	},
};