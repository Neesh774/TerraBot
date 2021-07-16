const Discord = require('discord.js');
const config = require('../config.json');
const path = require('path');
const { registerFont, createCanvas } = require('canvas');
const Canvas = require('canvas');
Canvas.registerFont(path.resolve(__dirname, '../assets/whitneybold.ttf'), { family: 'Bold' });

module.exports = {
	name: 'guildMemberUpdate',
	async execute(oldMember, newMember, client) {
		const PS = await client.guilds.fetch(config.PS);
		const logs = PS.channels.cache.get(config.logs);
		let updated = false;
		let embed = false;
		if (oldMember.nickname != newMember.nickname) {
			embed = new Discord.MessageEmbed(client, newMember.guild)
				.setColor('#ffdc40')
				.setDescription(`**${newMember.toString()} nickname changed**`)
				.setFooter(`ID: ${newMember.id}`)
				.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
				.addFields(
					{ name: 'Before:', value: `${oldMember.nickname ? oldMember.nickname : '*None*'}`, inline: true },
					{ name: 'After:', value: `${newMember.nickname ? newMember.nickname : '*None*'}`, inline: true })
				.setTimestamp();
			updated = true;
		}
		const rolesAdded = newMember.roles.cache.filter(x => !oldMember.roles.cache.get(x.id));
		const rolesRemoved = oldMember.roles.cache.filter(x => !newMember.roles.cache.get(x.id));
		if (rolesAdded.size != 0 || rolesRemoved.size != 0) {
			const roleAddedString = [];
			for (const role of rolesAdded.array()) {
				roleAddedString.push(role.toString());
			}
			const roleRemovedString = [];
			for (const role of rolesRemoved.array()) {
				roleRemovedString.push(role.toString());
			}
			embed = new Discord.MessageEmbed(client, newMember.guild)
				.setColor(config.embedColor)
				.setDescription(`**${newMember.toString()} roles changed**`)
				.setFooter(`ID: ${newMember.id}`)
				.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
				.addFields(
					{ name: `Added roles [${rolesAdded.size}]:`, value: `${roleAddedString.length == 0 ? '*None*' : roleAddedString.join('\n ')}`, inline: true },
					{ name: `Removed Roles [${rolesRemoved.size}]:`, value: `${roleRemovedString.length == 0 ? '*None*' : roleRemovedString.join('\n ')}`, inline: true })
				.setTimestamp();
			updated = true;
		}

		const hadRole = oldMember.roles.cache.find(role => role.name === 'Server Booster');
		const hasRole = newMember.roles.cache.find(role => role.name === 'Server Booster');

		if(!hadRole && hasRole) {
			const member = newMember;
			const canvas = Canvas.createCanvas(3000, 1620);
			// make it "2D"
			const ctx = canvas.getContext('2d');
			// set the Background to the welcome.png
			const background = await Canvas.loadImage(path.resolve(__dirname, '../assets/boost.png'));
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
			// ctx.strokeStyle = '#f2f2f2';
			ctx.strokeRect(0, 0, canvas.width, canvas.height);
			// set the first text string
			const textString3 = `${member.user.username}`;
			ctx.font = '180px "bold"';
			ctx.fillStyle = '#ffffff';
			ctx.textAlign = 'center';
			ctx.fillText(textString3, 1500, 970, 1900);
			// create a circular "mask"
			ctx.beginPath();
			ctx.arc(320, 915, 180, 0, Math.PI * 2, true);// position of img
			ctx.closePath();
			ctx.clip();
			// define the user avatar
			const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
			// draw the avatar
			ctx.drawImage(avatar, 140, 735, 360, 360);
			// get it as a discord attachment
			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'boost-image.png');
			// define the welcome embed
			const welcomeembed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTimestamp()
				.setFooter('TerraBot Info', member.guild.iconURL({ dynamic: true }))
				.addField(`${member.user.username}, Thanks for boosting!`, `The server now has ${PS.premiumSubscriptionCount} boosts, and is on tier ${PS.premiumTier}.`, true)
				.setImage('attachment://boost-image.png')
			const welcome = PS.channels.cache.get(config.welcome);
			welcome.send({ embeds: [welcomeembed], files: [attachment] });
			updated = true;
			embed = new Discord.MessageEmbed()
				.setColor(config.embedColor)
				.setTimestamp()
				.setDescription(`${member.user.username} boosted the server! We now have ${PS.premiumSubscriptionCount} boosts, and are on tier ${PS.premiumTier}.`)
				.setThumbnail(member.user.avatarURL());
		}

		if(updated) logs.send({ embeds: [embed] });
	},
};