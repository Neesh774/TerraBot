const Discord = require('discord.js');
const config = require('../../config.json');
const topics = require('../../topics.json');
module.exports = {
<<<<<<< HEAD
    name: "topic",
    category: "fun",
    description: "Will give you a conversation starter.",
    usage: `${config.prefix}topic`,
    run: async (client, message, args) => {
        let index = Math.floor(Math.random() * 170 + 1);
        let topic = topics.All_Topics[index].Table_Topic;
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setDescription(topic);
        return message.reply({embeds: [embed]});
    }
}
=======
	name: 'topic',
	category: 'fun',
	description: 'Will give you a conversation starter.',
	usage: `${config.prefix}topic`,
	options: [],
	run: async (client, message, args) => {
		const index = Math.floor(Math.random() * 170 + 1);
		const topic = topics.All_Topics[index].Table_Topic;
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setDescription(topic);
		return message.channel.send({ embeds: [embed] });
	},
};
>>>>>>> b406229fc442f1bd392ea7ab7f992bbcd3f35221
