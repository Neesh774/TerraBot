const Discord = require('discord.js');
const config = require('../../config.json');
const emojis = require('../../emojis.js');
const rrSchema = require('../../models/rrschema.js');
module.exports = {
    name: "rr",
    category: "Reaction Roles",
    description: "Creates a reaction role on the given message with the given emote",
    usage: `${config.prefix}rr <Channel ID> <Message ID> <Role ID> <Reaction Emote>`,
    run: async(client, message, args) => {
        try{
            let channel = args[0]

            let msg = await channel.messages.fetch(args[1]);

            let role = args[2];

            let emoji = await Discord.Util.parseEmoji(args[3]);
            if (!emoji && !emojis.includes(args[3])) return message.reply({content: ":x: | **Specify a valid emoji**"});
            if (emoji && !emojis.includes(args[3])) {
                let checking = await client.emojis.cache.find(x => x.id === emoji.id);
                if (!checking) return message.reply({content: `:x: | **Invalid Emoji**`});
            };
            const numRRs = await rrSchema.countDocuments({}) + 1;
            const rr = new rrSchema({
                id: numRRs,
                messageID: mes,
                channelID: channelid,
                roleID: role,
                reactionID: emoji.id
            });
            rr.save();
            msg.react(emoji.id)
            let embed = new Discord.MessageEmbed()
                .setTitle("Success!")
                .setDescription("Reaction role spawned successfully")
                .setColor(config.embedColor);
            return message.reply({embeds: [embed]});
        }
        catch (e){
            console.log(e.stack);
            return message.reply({content: ":x: There was an error. Please make sure you're using the proper arguments and try again."});
        }
    }
}; 
