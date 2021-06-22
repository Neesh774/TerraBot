const Discord = require("discord.js");
const config = require("../../config.json");
const lSchema = require('../../models/levelroleschema.js');
const functions = require('../../functions.js');

module.exports = {
    name: "getlevel",
    category: "levels",
    description: "TerraBot tells you what level you would be at with a certain amount of xp",
    usage: `${config.prefix}getlevel <xp>`,
    run: async (client, message, args) => {
    //command
        if(!args[0]){
            return message.reply("How much xp should I count?");
        }
        try{
<<<<<<< HEAD
            const level = await functions.getLevel(args[0]);
=======
            const level = await functions.getLevel(args[0]/100);
>>>>>>> 9d7e8c43e83a116f7ae2d039c0ed30117ac7181d
            return message.reply(`If you had ${args[0]} xp, that would put you at level ${level}`);
        }
        catch(e){
            console.log(e.stack);
            return message.channel.send(":x: There was an error. Please make sure you're using the proper arguments and try again.");
        }
    }
};