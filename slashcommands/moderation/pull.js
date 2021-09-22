const Discord = require('discord.js');
const config = require('../../config.json');
const git = require("simple-git");
const {execSync} = require('child_process');
module.exports = {
	name: 'pull',
	category: 'moderation',
	description: 'TerraBot pulls changes from Github',
	usage: `${config.prefix}pull`,
	options: [],
	moderation: true,
	run: async (client, interaction) => {
		// command
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.editReply('You don\'t have permissions for that :/');
		}

		await interaction.editReply("Pulling git changes and restarting bot.");
        // pull changes and return an embed with a summary of the changes
        const output = execSync('git pull').toString();
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Pulled changes')
            .setDescription(output)
            .setFooter('TerraBot');
        await interaction.channel.send(embed);
        await client.destroy();
        client.login(config.token);
	},
};