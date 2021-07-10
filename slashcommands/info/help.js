const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const config = require('../../config.json');

module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'info',
	description: 'Returns all commands, or one specific command info',
	usage: `${config.prefix}help [command]`,
	options: [
		{
			name: 'command',
			type: 'STRING',
			description: 'The command you want help with',
			required: false,
		},
	],
	run: async (client, message, args) => {
		// If there's an args found
		// Send the info of that command found
		// If no info found, return not found embed.
		if (args[0]) {
			return getCMD(client, message, args[0]);
		}
		else {
			// Otherwise send all the commands available
			// Without the cmd info
			return getAll(client, message);
		}
	},
};

function getAll(client, message) {
	const embed = new MessageEmbed()
		.setColor(config.embedColor)
		.setThumbnail('https://cdn.discordapp.com/avatars/546100087579738133/ea87b6e238044da37381c2277987fd3e.webp')
		.setTitle('Help Menu')
		.setURL('https://www.youtube.com/watch?v=X1JRoP0xCqs')
		.setFooter('To see command descriptions and usage type .help [CMD Name]');

	// Map all the commands
	// with the specific category
	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `\`${cmd.name}\``)
			.join(', ');
	};

	// Map all the categories
	const info = client.categories
		.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
		.reduce((string, category) => string + '\n' + category);

        message.reply({ content: 'Sent help to dms' })


    return message.user.send({ embeds: [embed.setDescription(info)] });

}

function getCMD(client, message, input) {
	const embed = new MessageEmbed();

	// Get the cmd by the name or alias
	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

	let info = `No information found for command **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.reply(embed.setColor(config.embedColor).setDescription(info));
    }

	// Add all cmd info to the embed
	if (cmd.name) info = `**Command name**: ${cmd.name}`;
	if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
	if (cmd.description) info += `\n**Description**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**: ${cmd.usage}`;
		embed.setFooter('Syntax: <> = required, [] = optional');
	}

    return message.reply(embed.setColor(config.embedColor).setDescription(info));
}