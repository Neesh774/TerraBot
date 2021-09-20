const Discord = require('discord.js');
const config = require('../../config.json');
const hlSchema = require('../../models/hlschema');
const databaseFuncs = require('../../functions/databaseFuncs');
module.exports = {
	name: 'highlights',
	category: 'moderation',
	description: 'Beano tells you everything you\'ve highlighted',
	usage: `${config.prefix}highlights`,
	options: [],
	moderation: true,
	run: async (client, interaction) => {
        const user = interaction.user;
        const schemas = await hlSchema.find({ userID: user.id });
        if (schemas.length === 0) {
            return interaction.editReply('You haven\'t highlighted anything yet!');
        }
        let description = '';
        for (let i = 0; i < schemas.length; i++) {
            description += `${i + 1}. ${schemas[i].phrase}\n`;
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Highlights for ${user.username}`)
            .setDescription(description)
            .setColor(config.embedColor);
        return interaction.editReply({ embeds: [embed] });
	},
};