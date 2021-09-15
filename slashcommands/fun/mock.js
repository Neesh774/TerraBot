const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'mock',
    category: 'fun',
    description: 'Will mock the text you give me',
    usage: `${config.prefix}mock <text>`,
    options: [
        {
            name: 'text',
            type: 'STRING',
            description: 'The text you want to mock',
            required: true,
        },
    ],
    run: async (client, interaction) => {
    // command
        let text = interaction.options.getString('text');
        for (let i = 0; i < text.length;i++) {
            const ranInt = Math.round(Math.random());
            if (ranInt == 1) {
                text = text.replace(text[i], text[i].toUpperCase());
            }
        }
        const embed = new MessageEmbed()
            .setColor(config.embedColor)
            .setAuthor(interaction.member.nickname, interaction.user.avatarURL())
            .setDescription(text)
            .setThumbnail('https://media.tenor.com/images/d0f9e3756a2b5546d88d6716de6f8c3f/tenor.gif');
        return interaction.editReply({ embeds: [embed] });
    },
};