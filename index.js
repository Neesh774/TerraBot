/* eslint-disable no-inline-comments */
// Modules
const { Client, Collection, Intents } = require('discord.js');
const databaseFuncs = require('./functions/databaseFuncs');
const messageFuncs = require('./functions/messageFuncs');
const config = require('./config.json');
const token = require('./token.json');
const fs = require('fs');
const mongoose = require('mongoose');
const badwords = require('./nonowords.json');
const Filter = require('badwords-filter');
const mSchema = require('./models/memberschema');
const { Player } = require('discord-player');
const client = new Client({
// Stops the bot from mentioning @everyone
	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES],
});
const automodFilter = {
    list: badwords.badwords,
    cleanWith: '*',
    useRegex: true,
};
const filter = new Filter(automodFilter);

const player = new Player(client, {
    autoSelfDeaf: true,
    enableLive: true,
    fetchBeforeQueued: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 60000,
    leaveOnEnd: true,
    leaveOnEndCooldown: 60000,
    leaveOnStop: true,
    ytdlDownloadOptions: {
        quality: 'highest',
        filter: 'audioonly',
    },
});

// Command Handler
client.slashcommands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
client.coolDowns = new Set();
client.autoResponseCoolDowns = new Set();
client.ccCoolDowns = new Set();
client.lockedChannels = new Set();
client.lockDown = false;
client.musicevents = new Collection();
client.player = player;
// Command Folder location
client.categories = fs.readdirSync('./slashcommands/');
['slashcommands', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

const moderationPerms = [
	{
		id: '884176293686575164', // General Manager
		type: 'ROLE',
		permission: true,
	},
	{
		id: '833806459690418236', // Cafe Owner
		type: 'ROLE',
		permission: true,
	},
	{
		id: '839250900165066772', // Barista
		type: 'ROLE',
		permission: true,
	},
	{
		id: config.neesh,
		type: 'USER',
		permission: true,
	},
];

// Bot Status
client.on('ready', async () => {
	try {
		const modCommands = fs.readdirSync('./slashcommands/moderation');
		const AC = client.guilds.cache.get(config.AC);
		const commands = await client.slashcommands;
		commands
		.each(async (command) => {
            const slash = client.slashcommands.get(command.name);
            if (!slash) {
                return await command.delete();
            }
			const moderation = modCommands.includes(`${command.name}.js`);
			const cmd = await AC.commands.create(
				{
					name: command.name,
					description: command.description,
					options: command.options,
					defaultPermission: !moderation,
				},
			);
			if (moderation) {
				await cmd.permissions?.set({ permissions: moderationPerms });
			}
		});
		console.log('Slash commands deployed successfully.');
		console.log(`Bot User ${client.user.username} has been logged in and is ready to use!`);
		client.user.setActivity('/help', { type: 'WATCHING' });
		databaseFuncs.connectMongoose(mongoose);
		await databaseFuncs.cacheMessages(client);
		await messageFuncs.checkBirthday(client);
	}
	catch (e) {
		console.log(e);
	}
});

client.on('messageCreate', async message => {
	// Loads prefix from config.json
	const prefix = (config.prefix);
	// Makes sure bot wont respond to other bots including itself
	if (message.system || message.author.bot) return;
	// Checks if the command is from a server and not a dm
	if (!message.guild) return;
	const schema = await mSchema.findOne({ userID: message.author.id });
	if (!schema) {
		databaseFuncs.createMember(message.author.username, message.author.id);
	}
	await messageFuncs.checkHighlight(message, client);
	if (filter.isUnclean(message.content)) {
        message.delete().then(msg => {
            databaseFuncs.warn(message.member, message.guild, message.channel, 'no no word', client, message, false);
            msg.channel.send({ content: 'SMH MY HEAD NO NO WORD' }).then(m => setTimeout(() => m.delete(), 5000));
        });
    }
	let exeFile = false;
	message.attachments.each(attachment => {
		if (attachment.name.endsWith('.exe')) {
			exeFile = true;
		}
	});
	if (exeFile) message.delete().then(msg => msg.channel.send({ content: 'No EXE files allowed' }).then(m => setTimeout(() => m.delete(), 5000)));
	await messageFuncs.sendAutoResponse(message, client);
	// Checks if the command starts with a prefix
	if (!message.content.startsWith(prefix)) return;
	// Makes sure bot wont respond to other bots including itself
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	if (cmd.length === 0) return;
	await messageFuncs.sendCustomCommand(message, client);
});

// Log into discord using the token in config.json
client.login(token.token);