const Discord = require('discord.js');
const config = require('../../config.json');
const ccSchema = require('../../models/ccschema.js');
module.exports = {
<<<<<<< HEAD
    name: "ccclearall",
    category: "Custom Commands and Auto Reponses",
    description: "Clears all custom commands",
    usage: `${config.prefix}ccclearall`,
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        await ccSchema.deleteMany();
        const PS = await client.guilds.fetch(config.PS); 
        const logs = await PS.channels.cache.get(config.logs);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Commands were cleared")
            .setTimestamp()
            .setDescription("Commands were cleared by user " + message.user.tag);
        logs.send({embeds: [embed]});
        return message.reply("Successfully cleared the commands list!");
        
    }
=======
	name: 'ccclearall',
	category: 'Custom Commands and Auto Reponses',
	description: 'Clears all custom commands',
	usage: `${config.prefix}ccclearall`,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.reply('You don\'t have permissions for that :/');
		}
		await ccSchema.deleteMany();
		const PS = await client.guilds.fetch(config.PS);
		const logs = await PS.channels.cache.get(config.logs);
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('Commands were cleared')
			.setTimestamp()
			.setDescription('Commands were cleared by user ' + message.author.tag);
		logs.send({ embeds: [embed] });
		return message.reply('Successfully cleared the commands list!');

	},
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
};