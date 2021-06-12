const Discord = require("discord.js");
const config = require("../../config.json");
const bSchema = require('../../models/bday.js');
const functions = require('../../functions.js');
const moment = require('moment');

module.exports = {
    name: "nextbirthday",
    category: "birthdays",
    description: "Beano tells you when the next birthday is!",
    usage: "nextbirthday",
    run: async (client, message, args) => {
    //command
        const birthdays = await bSchema.find();
        birthdays.sort((a, b) => formatDate(a.birthday) - formatDate(b.birthday));
        let offsets = [...birthdays];
        if(!birthdays){
            return message.reply("No one in this server has set their birthday yet.");
        }
        if(!birthdays){
            return message.reply("No one in this server has set their birthday yet.");
        }
        let birthdayEntry = find(offsets)
        let bday = formatUser(birthdays[birthdayEntry])
        let user = await message.guild.members.fetch(birthdays[birthdayEntry].userID);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle("Next Birthday")
            .setDescription(`We'll be wishing ${user.toString()} a happy birthday on ${birthdays[birthdayEntry].birthday.toString().slice(0,15)}`)
        return message.channel.send(embed);
    }
};

const formatUser = (member) => {
    const date = moment(member.birthday).format("MMM Do");
    return `${date} => ${member.user}\n`;
};


const formatDate = (member) => {
    const date = moment(member.birthday).format("MM DD");
    return date
};

let find = (birthdays) => {
    let currentTime = new Date();
    
    let low = 0, high = birthdays.length-1
    let res = 0
    while(low<high){
        let mid = Math.floor((low + high)/2) 
        if(birthdays[mid].birthday>currentTime){
            res = mid
            high = mid - 1
        }else{
            low = mid + 1
        }
    }
    return res

}