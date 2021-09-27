const Discord = require('discord.js');
const config = require('../../config.json');
const git = require("simple-git");
const {execSync} = require('child_process');
const token = require('../../token.json');
module.exports = {
	name: 'pull',
	category: 'moderation',
	description: 'TerraBot pulls changes from Github',
	usage: `${config.prefix}pull`,
	options: [],
	moderation: true,
	run: async (client, interaction) => {
		// command


		await interaction.editReply("Pulling git changes and restarting bot.");
        // pull changes and return an embed with a summary of the changes
        execSync('git stash');
        const output = execSync('git pull').toString();
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Pulled changes')
            .setDescription(output)
            .setFooter('TerraBot');
        const npm = execSync('npm i').toString();
        await interaction.channel.send({ embeds: [embed] });
        await client.destroy();
        client.login(token.token);
	},
};