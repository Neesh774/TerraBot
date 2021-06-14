const Discord = require("discord.js");
const config = require("../../config.json");
const bSchema = require('../../models/bday.js');
const functions = require('../../functions.js');

module.exports = {
    name: "birthday",
    category: "birthdays",
    description: "Beano tells you when your birthday is. It's ok, we can all forget sometimes.",
    usage: `${config.prefix}birthday`,
    run: async (client, message, args) => {
    //command
        const hasbday = await bSchema.findOne({userID: message.author.id});
        if(!hasbday){
            return message.reply("You don't have a birthday! Set one using the `setbday <mm> <dd> <yyyy>` command!");
        }
        const formattedDate = hasbday.birthday.toString().slice(0,15);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setDescription(`Your birthday is set to ${formattedDate}`);
        return message.channel.send(embed);
    }
};