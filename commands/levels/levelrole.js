const Discord = require("discord.js");
const config = require("../../config.json");
const lSchema = require('../../models/levelroleschema.js');
module.exports = {
    name: "levelrole",
    category: "levels",
    description: "TerraBot will automatically give users a role when they get to a certain level",
    usage: `${config.prefix}levelrole <roleID> <level>`,
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