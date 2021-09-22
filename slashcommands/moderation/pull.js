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
        git().pull('origin', 'master', {}, async (err, result) => {
            if (result.summary.changes === 0 && result.summary.insertions === 0 && result.summary.deletions === 0) {
                await client.guilds.cache.get(config.PS).channels.cache.get(config.botLoggingChannel).send("The bot is up to date.");
            } else {
                await client.guilds.cache.get(config.PS).channels.cache.get(config.botLoggingChannel).send("**Changes: **" + result.summary.changes + "\n" +
                    "**Insertions: **" + result.summary.insertions + "\n" +
                    "**Deletions: **" + result.summary.deletions);
                if (result.insertions.hasOwnProperty("package.json") || result.insertions.hasOwnProperty("package-lock.json")) {
                    await client.guilds.cache.get(config.PS).channels.cache.get(config.botLoggingChannel).send("It seems the bot dependencies have changed, performing dependency update...");
                    await execSync('npm install');
                    await client.guilds.cache.get(config.PS).channels.cache.get(config.botLoggingChannel).send("Dependency update complete!");
                }
                await client.guilds.cache.get(config.PS).channels.cache.get(config.botLoggingChannel).send("Restarting...");
            }
        });
	},
};