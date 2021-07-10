const Discord = require("discord.js");
const config = require("../../config.json");
const bSchema = require('../../models/bday.js');
const functions = require('../../functions.js');

module.exports = {
    name: "setbday",
    category: "birthdays",
    description: "TerraBot sets your birthday!",
    usage: `${config.prefix}setbday <mm> <dd>`,
    run: async (client, message, args) => {
    //command
    
        if(args.length != 2){
            return message.reply("Please send me your birthday in the format `<mm> <dd>`(with spaces in between)!");
        }
        const month = parseInt(args[0]);
        const day = parseInt(args[1]);
        if((!month || !day) || month < 0 || month > 12 || day > 31 || day < 1){
            return message.reply("Please send me your birthday in the format `<mm> <dd>`(with spaces in between)!");
        }
        const hasbday = await bSchema.findOne({userID: message.author.id});
        if(hasbday){
            await hasbday.remove();
        }
        let datestring = `${month} ${day}`;
        let bday = new bSchema({
            user: message.author.username,
            userID: message.author.id,
            birthday: new Date(datestring)
        });
        await bday.save();
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Birthday set successfully")
            .setDescription(`I set your birthday to ${new Date(datestring).toString().slice(4, 10)}`);
        return message.channel.send({embeds: [embed]});
    }
};