const config = require('../../config.json');
const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
	name: 'deployslashes',
	category: 'info',
	description: 'Deploys slash commands',
	usage: `${config.prefix}deployslashes`,
	run: async (client, message, args) => {
		const data = [];
        if(!message.member.permissions.has('MANAGE_MESSAGES') && message.member.id !== config.neesh) message.reply('You don\'t have permissions for that :/');
		client.slashcommands.forEach(cmd => {
			if(cmd.options) {
                console.log(`Deploying ${cmd.name} with options:`)
                console.log(cmd.options);
				data.push(
					{
						name: cmd.name,
						description: cmd.description,
						options: cmd.options,
					});
			}
			else{
				data.push(
					{
						name: cmd.name,
						description: cmd.description,
					});
			}
		});
		const command = await client.guilds.cache.get(config.PS).commands.set(data);
        message.reply('Deployed all slashes');
	},
};