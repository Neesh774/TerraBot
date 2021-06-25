const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema.js');
module.exports = {
<<<<<<< HEAD
    name: "clearxp",
    category: "levels",
    description: "TerraBot will clear all of the xp",
    usage: `${config.prefix}clearxp`,
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        await mSchema.deleteMany();
        message.reply("Successfully cleared all of the levels!");
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Levels were cleared")
            .setTimestamp()
            .setDescription("All levels were cleared by user " + message.user.toString());
        return logs.send({embeds: [embed]});
    }
=======
	name: 'clearxp',
	category: 'levels',
	description: 'TerraBot will clear all of the xp',
	usage: `${config.prefix}clearxp`,
	options: [],
	run: async (client, message, args) => {
		// command
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		await mSchema.deleteMany();
		message.reply('Successfully cleared all of the levels!');
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Levels were cleared')
			.setTimestamp()
			.setDescription('All levels were cleared by user ' + message.author.toString());
		return logs.send({ embeds: [embed] });
	},
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
};