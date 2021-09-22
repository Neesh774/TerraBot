const Discord = require('discord.js');
const config = require('../../config.json');
const convert = require('color-convert');
module.exports = {
	name: 'color',
	category: 'utility',
	description: 'Allows you to visualize a color',
	usage: `${config.prefix}color <hex code | rgb(r, g, b) | name>`,
	options: [
		{
			name: 'color',
			type: 'STRING',
			description: 'The hex code or RGB value of your color in the format \'r, g, b\'',
			required: true,
		},
	],
	run: async (client, interaction) => {
        let color = interaction.options.getString('color');
        if (color.startsWith('#')) {
            color = color.slice(1);
        } else if (color.split(',').length == 3) {
            color = color.split(', ');
            for (var i = 0; i < color.length; i++) {
                color[i] = parseInt(color[i]);
            }
            color = convert.rgb.hex(color);
        }
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('Color')
            .addField('RGB', `${convert.hex.rgb(color)}`, true)
            .addField('Hex', `#${color}`, true)
            .setThumbnail('https://serux.pro/rendercolour?hex=' + color)
            .addField('Name', convert.hex.keyword(color), true);

        // send the embed
        interaction.editReply({ embeds: [embed] });
    }
}