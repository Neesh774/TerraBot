const Discord = require("discord.js");
const config = require("../../config.json");
const bSchema = require('../../models/bday.js');
const functions = require('../../functions.js');

module.exports = {
    name: "setbday",
    category: "birthdays",
    description: "Beano sets your birthday!",
    usage: `${config.prefix}setbday <mm> <dd> <yyyy>`,
    run: async (client, message, args) => {
    //command
    
        if(args.length != 3){
            return message.reply("Please send me your birthday in the format `<mm> <dd> <yyyy>`(with spaces in between)!");
        }
        const month = parseInt(args[0]);
        const day = parseInt(args[1]);
        const year = parseInt(args[2]);
        if((!month || !day || !year) || month < 0 || month > 12 || day > 31 || year < 1950 || year > 2008){
            return message.reply("Please send me your birthday in the format `<mm> <dd> <yyyy>`(with spaces in between)!");
        }
        const hasbday = await bSchema.findOne({userID: message.author.id});
        if(hasbday){
            await hasbday.remove();
        }
        let datestring = `${month} ${day} ${year}`;
        let bday = new bSchema({
            user: message.author.username,
            userID: message.author.id,
            birthday: new Date(datestring)
        });
        await bday.save();
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Birthday set successfully")
            .setDescription(`I set your birthday to ${new Date(datestring).toString().slice(0, 15)}`);
        return message.channel.send(embed);
    }
};