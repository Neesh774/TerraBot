const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'interaction',
    async execute(interaction, client){
        if(interaction.isCommand()){
            const command = client.commands.get(interaction.commandName);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            let args = [];
            interaction.options.each(option => {
                if(option.options){
                    option.options.each(op => {
                        args.push(op.value.toString());
                    })
                }  
                else{args.push(option.value.toString())};
            })
            if (command){
                command.run(client, interaction, args);
            }
        }
	}
}