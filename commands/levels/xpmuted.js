const Discord = require('discord.js');
const config = require('../../config.json');
const mcSchema = require('../../models/mchannelschema.js');
module.exports = {
<<<<<<< HEAD
    name: "xpmuted",
    category: "levels",
    description: "TerraBot lists all the channels that are xp muted",
    usage: `${config.prefix}xpmuted`,
    run: async (client, message, args) => {
    //command
        let numMuted = await mcSchema.countDocuments();
        let fields = [];
        let list = await mcSchema.find({});
        const PS = await client.guilds.fetch(config.PS);
        for(var i = 0;i < numMuted; i ++){
            let channel = await PS.channels.cache.get(list[i].channel);
            fields.push({"name": `#${i+1}`, "value": `${channel.toString()}`})
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("XP Muted Channels")
            .addFields(fields);
        return message.reply({embeds: [embed]});
    }
=======
	name: 'xpmuted',
	category: 'levels',
	description: 'TerraBot lists all the channels that are xp muted',
	usage: `${config.prefix}xpmuted`,
	options: [],
	run: async (client, message, args) => {
		// command
		const numMuted = await mcSchema.countDocuments();
		const fields = [];
		const list = await mcSchema.find({});
		const PS = await client.guilds.fetch(config.PS);
		for(var i = 0;i < numMuted; i++) {
			const channel = await PS.channels.cache.get(list[i].channel);
			fields.push({ 'name': `#${i + 1}`, 'value': `${channel.toString()}` });
		}
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setTitle('XP Muted Channels')
			.addFields(fields);
		return message.channel.send({ embeds: [embed] });
	},
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
};