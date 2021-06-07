const Discord = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
const lSchema = require('C:/Users/kkanc/Beano/models/levelroleschema.js');
const functions = require('C:/Users/kkanc/Beano/functions.js');

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
            const xp = await functions.getXP(args[0]/100);
            const xpNext = await functions.getXP((args[0]+1)/100) - 1;
            return message.reply(`The range of level ${args[0]} is ${xp}-${xpNext}`);
        }
        catch(e){
            console.log(e.stack);
            return message.reply("There was an error. Please try that again, making sure you're giving me a number");
        }
    }
};