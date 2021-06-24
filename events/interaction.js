const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'interaction',
    async execute(interaction, client){
        if(interaction.isCommand()){
            if (interaction.commandName === 'ping') await interaction.reply({content: 'Pong!'});
        }
    }
}