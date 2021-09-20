const Discord = require('discord.js');
const config = require('../../config.json');
const hlSchema = require('../../models/hlschema');
const databaseFuncs = require('../../functions/databaseFuncs');
module.exports = {
	name: 'highlight',
	category: 'moderation',
	description: 'Beano will ping you anytime this phrase is sent in chat!',
	usage: `${config.prefix}highlight <phrase>`,
	options: [
		{
			name: 'phrase',
			type: 'STRING',
			description: 'The phrase to highlight',
			required: true,
		},
        {
            name: 'ignore',
            type: 'CHANNEL',
            description: 'The channel to ignore',
            required: false,
        },
	],
	moderation: true,
	run: async (client, interaction) => {
		const phrase = interaction.options.getString('phrase');
        const user = interaction.user;
        const ignore = interaction.options.getChannel('ignore');
        let schema = await hlSchema.findOne({ userID: user.id, phrase: phrase, ignore: ignore ? ignore.id : null });
        if (!schema) {
            schema = new hlSchema({
                userID: user.id,
                phrase: phrase,
                ignore: ignore ? ignore.id : null,
            });
            await schema.save();
            return interaction.editReply(`Added your highlight for \`${phrase}\``);
        }
        if (schema) {
            await schema.delete();
            return interaction.editReply(`Removed your highlight for \`${phrase}\``);
        }
	},
};