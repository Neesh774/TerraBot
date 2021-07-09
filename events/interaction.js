const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'interaction',
    async execute(interaction, client){
        if(interaction.isCommand()){
            let command = client.slashcommands.get(interaction.commandName);
            if (!command) command = client.slashcommands.get(client.aliases.get(interaction.commandName));
            const args = [];
            interaction.options.each(option => {
                if(option.options){
                    option.options.each(op => {
                        args.push(op.value.toString());
                    })
                }
                else{args.push(option.value.toString())}
            })
            if (command){
                command.run(client, interaction, args);
            }
        }
	},
}