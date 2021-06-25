const Discord = require('discord.js');
const config = require('../../config.json');
const sSchema = require('../../models/suggestschema');
module.exports = {
<<<<<<< HEAD
    name: "suggest",
    category: "suggestions",
    description: "Suggest something in the suggestions channel!",
    usage: `${config.prefix}suggest <suggestion>`,
    run: async (client, message, args) => {
    //command
    const numSuggest = await sSchema.countDocuments({});
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`Suggestion #${numSuggest + 1}`)
            .setDescription(args.join(" "));
        const PS = await client.guilds.fetch(config.PS); 
        const suggest = await PS.channels.cache.get(config.suggestions);
        let msg;
        message.delete().then(messg =>{
            msg = messg;
        });
        await suggest.send({embeds: [embed]}).then(msgtwo =>{
            const sSuggest = new sSchema({
                id: numSuggest + 1,
                suggestion: args.join(" "),
                createdBy: message.user.tag,
                createdByIcon: message.user.avatarURL(),
                createdByID: message.user.id,
                createdAt: message.createdAt.toUTCString(),
                messageID: msgtwo.id,
                status: "Unread",
                reason: "N/A",
                upvotes: 0,
                downvotes: 0
            })
            sSuggest.save().catch(err => console.log(err));
            msgtwo.react(config.upvote).catch(err => msgtwo.react("👍"));
            msgtwo.react(config.downvote).catch(err => msgtwo.react("👎"));
        })
    }
=======
	name: 'suggest',
	category: 'suggestions',
	description: 'Suggest something in the suggestions channel!',
	usage: `${config.prefix}suggest <suggestion>`,
	options: [
		{
			name: 'suggestion',
			type: 'STRING',
			description: 'The text you want to suggest',
			required: true,
		},
	],
	run: async (client, message, args) => {
		// command
		const numSuggest = await sSchema.countDocuments({});
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle(`Suggestion #${numSuggest + 1}`)
			.setDescription(args.join(' '));
		const PS = await client.guilds.fetch(config.PS);
		const suggest = await PS.channels.cache.get(config.suggestions);
		let msg;
		message.delete().then(messg =>{
			msg = messg;
		});
		await suggest.send({ embeds: [embed] }).then(msgtwo =>{
			const sSuggest = new sSchema({
				id: numSuggest + 1,
				suggestion: args.join(' '),
				createdBy: message.author.tag,
				createdByIcon: message.author.avatarURL(),
				createdByID: message.author.id,
				createdAt: message.createdAt.toUTCString(),
				messageID: msgtwo.id,
				status: 'Unread',
				reason: 'N/A',
				upvotes: 0,
				downvotes: 0,
			});
			sSuggest.save().catch(err => console.log(err));
			msgtwo.react(config.upvote).catch(err => msgtwo.react('👍'));
			msgtwo.react(config.downvote).catch(err => msgtwo.react('👎'));
		});
	},
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
};