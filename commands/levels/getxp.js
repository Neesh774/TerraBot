const Discord = require("discord.js");
const config = require("../../config.json");
const lSchema = require('../../models/levelroleschema.js');
const functions = require('../../functions.js');

module.exports = {
    name: "getxp",
    category: "levels",
    description: "Beano tells you the range of a certain level",
    usage: "getxp <level>",
    run: async (client, message, args) => {
    //command
        if(!args[0]){
            return message.reply("How much xp should I count?");
        }
        try{
            const level = parseInt(args[0]);
            const xp = await functions.getXP(level);
            const xpNext = await functions.getXP(level+1);
            return message.reply(`The range of level ${args[0]} is ${xp}-${xpNext}`);
        }
        catch(e){
            console.log(e.stack);
            return message.reply("There was an error. Please try that again, making sure you're giving me a number");
        }
    }
};