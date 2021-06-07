const Discord = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
const lSchema = require('C:/Users/kkanc/Beano/models/levelroleschema.js');
module.exports = {
    name: "levelrole",
    category: "levels",
    description: "Beano will automatically give users a role when they get to a certain level",
    usage: "levelrole <roleID> <level>",
    run: async (client, message, args) => {
    //command
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.channel.send(`:x: | **Role Not Found**`);

        let levelNum = args[1];
        if(!levelNum || levelNum < 0){
            return message.channel.send(":X | **Couldn't set that level");
        }

        const lr = new lSchema({
            roleID: role.id,
            level: levelNum
        });
        lr.save();
        return message.channel.send(`Successfully set to give users the role ${role.name} when they get to level ${levelNum}`);
    }
};