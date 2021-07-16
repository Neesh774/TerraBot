const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.js')
const rrSchema = require('../../models/rrschema.js');
module.exports = {
    name: 'rr',
    category: 'Reaction Roles',
    description: 'Creates a reaction role on the given message with the given emote',
    usage: `${config.prefix}rr <Channel ID> <Message ID> <Role ID> <Reaction Emote>`,
    run: async (client, message, args) => {

        // command
        try{
            console.log(args);
            const channel = message.mentions.channels.first() || await message.guild.channels.cache.get(args[0]);
            if (!channel) return message.channel.send({ content: ':x: | **Channel Not Found**' });
            const channelid = channel.id;

            const msg = await channel.messages.fetch(args[1]);
            if (!msg) return message.channel.send(':x: | **Message Not Found**');
            const mes = msg.id;

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
            if (!role) return message.channel.send({ content: ':x: | **Role Not Found**' });
            role = role.id;

            let embed = new Discord.MessageEmbed()
                .setTitle("Success!")
                .setDescription("Reaction role spawned successfully")
                .setColor(config.embedColor);

            let emoji = args[3];
            if(emoji.includes(':')) emoji = emoji.replace("<:", "").slice(emoji.replace("<:", "").indexOf(":") + 1, emoji.replace("<:", "").length - 1);
            console.log(emoji);
            await msg.react(emoji).then(() => {//attempt unicode emoji
                message.reply({embeds: [embed]});
            }).catch(err => message.reply("Invalid emoji. I must have access to the emoji.").then(m => setTimeout(async () => {await m.delete()}, 7500)))
            const numRRs = await rrSchema.countDocuments({}) + 1;
            const rr = new rrSchema({
                id: numRRs,
                messageID: mes,
                channelID: channelid,
                roleID: role,
                reactionID: emoji
            });
            rr.save();
        }
        catch (e){
            console.log(e.stack);
            return message.channel.send({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });
        }
    },
};