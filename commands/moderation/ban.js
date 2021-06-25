const Discord = require("discord.js");
const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ban",
    category: "moderation",
    description: "bans a mentioned user",
    usage: `${config.prefix}ban <user> [reason]`,
    run: async (client, message, args) => {
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);

        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.user.id)) return message.reply({content: "**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"});
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply({content: "**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"});
            if (!args[0]) return message.reply("**Please Provide A User To Ban!**")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.reply({content: "**User Is Not In The Guild**"});
            if (banMember === message.member) return message.reply({content: "**You Cannot Ban Yourself**"})

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.reply({content: "**Cant Kick That User**"})
            try {
            message.guild.members.ban(banMember)
            banMember.send({content: `**Hello, You Have Been Banned From ${message.guild.name} for - ${reason || "No Reason"}**`}).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor(config.embedColor)
                .setDescription(`**${banMember.user.username}** has been banned for ${reason}`)
            message.reply({embeds: [sembed]})
            } else {
                var sembed2 = new MessageEmbed()
                .setColor(config.embedColor)
                .setDescription(`**${banMember.user.username}** has been banned`)
            message.reply({embeds: [sembed2]})
            }

            const embed = new MessageEmbed()
                .setColor(config.embedColor)
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.user.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();
            logs.send({embeds: [embed]});
        } catch (e) {
            console.log(e.stack);
            return message.reply({content:`**:x: Error, please try again**`});
        }
    }
}
