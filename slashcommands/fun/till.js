const config = require('../../config.json');

module.exports = {
    name: 'till',
    category: 'fun',
    description: 'Tells you how many users are needed until the number you enter',
    usage: `${config.prefix}till <number>`,
    options: [
        {
            name: 'number_of_users',
            type: 'INTEGER',
            description: 'The number of users you wnat info about',
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const num = interaction.options.getInteger('number_of_users');
        if (!num || num < 1) return interaction.editReply('Please enter a valid number.');
        if (num < interaction.guild.memberCount) {
            return interaction.editReply(`We already have ${num} users in this server!`);
        }
        interaction.editReply(`${interaction.guild.name} needs ${num - interaction.guild.memberCount} members before getting to ${num} members.`);
    },
};