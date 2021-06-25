const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "say",
    category: "utility",
    description: "TerraBot will repeat you.",
    usage: `${config.prefix}say <text>`,
    options: [
        {
            name: 'text',
            type: 'STRING',
            description: 'The text TerraBot should say',
            required: true,
        },
    ],
    run: async (client, message, args) => {
    //command
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that.");
        }
        if(!args[0]){
            return message.reply("You need to give me something to say!");
        }
        message.delete().then(msg =>{
            return msg.channel.send({content: args.join(" ")});
        })
    }
};