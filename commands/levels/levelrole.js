const Discord = require('discord.js');
const config = require('../../config.json');
const lSchema = require('../../models/levelroleschema.js');
module.exports = {
	name: 'levelrole',
	category: 'levels',
	description: 'TerraBot will automatically give users a role when they get to a certain level',
	usage: `${config.prefix}levelrole <roleID> <level>`,
	options: [
		{
			name: 'role',
			type: 'ROLE',
			description: 'The role you want users to get',
			required: true,
		},
		{
			name: 'level',
			type: 'INTEGER',
			description: 'The level you want users to be at for this role.',
			required: true,
		},
	],
	run: async (client, message, args) => {
		// command
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if (!role) return message.channel.send({ content: ':x: | **Role Not Found**' });

		const levelNum = args[1];
		if(!levelNum || levelNum < 0) {
			return message.channel.send({ content: ':X | **Couldn\'t set that level' });
		}

		const lr = new lSchema({
			roleID: role.id,
			level: levelNum,
		});
		lr.save();
		return message.channel.send({ content: `Successfully set to give users the role ${role.name} when they get to level ${levelNum}` });
	},
};