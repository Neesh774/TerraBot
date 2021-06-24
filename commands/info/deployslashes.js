const config = require("../../config.json");
const Discord = require("discord.js");
const fs = require('fs');
module.exports = {
    name: "deployslashes",
    category: "info",
    description: "Deploys slash commands",
    usage: `${config.prefix}deployslashes`,
    run: async (client, message, args) => {
        const data = [];
        client.commands.forEach(cmd => {
            if(cmd.options){
                data.push(
                    {
                        name: cmd.name, 
                        description: cmd.description,
                        options: cmd.options
                    })
            }
            else{
                data.push(
                    {
                        name: cmd.name, 
                        description: cmd.description
                    })
            }
            })
		const command = await client.guilds.cache.get(config.PS).commands.set(data);
    }
}
