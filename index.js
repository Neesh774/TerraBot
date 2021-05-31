//Modules
const { Client, Collection } = require("discord.js");
const functions = require("./functions.js");
const config = require("./config.json");
const fs = require("fs");
const StarboardsManager = require('discord-starboards');
const badwords = require('./nonowords.json');
const client = new Client({
//Stops the bot from mentioning @everyone
disableEveryone: true
});

//Command Handler
client.commands = new Collection();
client.aliases = new Collection();
const manager = new StarboardsManager(client);
client.starboardsManager = manager;

//Command Folder location
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//Bot Status
client.on("ready", () => {
console.log(`Bot User ${client.user.username} has been logged in and is ready to use!`);
client.user.setActivity('!bhelp', { type: 'WATCHING' });
});

client.on("message", async message => {
    //Loads prefix from config.json
    const prefix = (config.prefix);
    //Makes sure bot wont respond to other bots including itself
    if (message.author.bot) return;
    //Checks if the command is from a server and not a dm
    if (!message.guild) return;
    //Checks if the command starts with a prefix
    for(var i = 0;i < badwords.badwords.length;i ++){
        if(message.content.toLowerCase().includes(badwords.badwords[i].toLowerCase())){
            message.delete().then(msg =>{
                functions.warn(message.member, message.guild, message.channel, "no no word", client);
                msg.channel.send("SMH MY HEAD NO NO WORD");
            })
        }
    }
    if (!message.content.startsWith(prefix)) return;
    //Makes sure bot wont respond to other bots including itself
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

//Log into discord using the token in config.json
client.login(config.token);