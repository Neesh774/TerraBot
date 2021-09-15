const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema.js');
const functions = require('../../functions.js');
module.exports = {
    name: 'setlevel',
    category: 'levels',
    description: 'TerraBot will change the level a user is at',
    usage: `${config.prefix}setlevel <user> <level>`,
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user you want to set the level of',
            required: true,
        },
        {
            name: 'level',
            type: 'INTEGER',
            description: 'The level you want to set the user to',
            required: true,
        },
    ],
    run: async (client, message, args) => {
        // command
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.reply('You don\'t have permissions for that :/');
        }
        const user = await functions.getMember(args[0], client, message.guild);
        const member = await mSchema.findOne({ userID: user.id });
        if(!member){
            await functions.createUserProfile(user.user)
        }
        if(args[1] < 0){
            message.reply('Couldn\'t set them to that level.');
        }
        try{
            member.level = args[1];
            const newxp = await functions.getXP(args[1]);
            member.xp = newxp;
            await member.save();
            message.reply(`Successfully set them to level ${args[1]}!`);
        }
        catch(e){
            console.log(e.stack);
            message.reply('Couldn\'t set them to that level. Please try again.');
        }
    },
};