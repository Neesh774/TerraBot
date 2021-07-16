const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.js');
const rrSchema = require('../../models/rrschema.js');
module.exports = {
    name: "rr",
    category: "Reaction Roles",
    description: "Creates a reaction role on the given message with the given emote",
    usage: `${config.prefix}rr <Channel ID> <Message ID> <Role ID> <Reaction Emote>`,
    options: [
        {
			name: 'channel',
			type: 'CHANNEL',
			description: 'The channel you want to put the reaction role in',
			required: true,
		},
        {
			name: 'message_id',
			type: 'STRING',
			description: 'The id of the message you want to put the reaction role on',
			required: true,
		},
        {
			name: 'role',
			type: 'ROLE',
			description: 'The role you want users to get',
			required: true,
		},
        {
			name: 'emoji',
			type: 'STRING',
			description: 'The emoji you want the reaction role to show up as on the message',
			required: true,
		},
    ],
    run: async(client, message, args) => {
        try{
            const channel = await message.guild.channels.cache.get(args[0]);
            if (!channel) return message.channel.reply({ content: ':x: | **Channel Not Found**' });
            const channelid = channel.id;
            const msg = await channel.messages.fetch(args[1]);
            if (!msg) return message.channel.reply(':x: | **Message Not Found**');
            const mes = msg.id;
            let role = message.guild.roles.cache.get(args[2]);
            if (!role) return message.reply({ content: ':x: | **Role Not Found**' });
            role = role.id;
            let embed = new Discord.MessageEmbed()
                .setTitle("Success!")
                .setDescription("Reaction role spawned successfully")
                .setColor(config.embedColor);
            let emoji;
            let reaction = args[3]
            await msg.react(reaction).then(() => {//attempt unicode emoji
                emoji = reaction;
                message.reply({embeds: [embed]});
            }).catch(err => message.reply("Invalid emoji. I must have access to the emoji.").then(m => setTimeout(async () => {await m.delete()}, 7500)));
            const numRRs = await rrSchema.countDocuments({}) + 1;
            if(emoji.includes(':')) emoji = emoji.replace("<:", "").slice(emoji.replace("<:", "").indexOf(":") + 1, emoji.replace("<:", "").length - 1);
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
            return message.reply({content: ":x: There was an error. Please make sure you're using the proper arguments and try again."});
        }
    }
}; 
