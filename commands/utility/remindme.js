const ms = require('ms');
const functions = require('../../functions.js');
const config = require('../../config.json');

module.exports = {
   name: 'remindme',
   description: 'Set a reminder',
   args: true,
   usage: `${config.prefix}remindme <time> <reminder>`,
   options: [
      {
         name: 'time',
         type: 'STRING',
         description: 'The time in which TerraBot will remind you',
         required: true,
      },
      {
         name: 'reminder',
         type: 'STRING',
         description: 'The actual reminder',
         required: true,
      },
   ],
   run: async (client, message, args) => {
      if(!args[0]){
         return message.reply('When should I remind you?');
      }
      if(!args[1]){
         return message.reply('What should I remind you with?');
      }
      const timeArg = args[0]
      functions.setReminder(message.member, timeArg, args.join(' '));
   },
};