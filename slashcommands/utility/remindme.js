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
      const timeArg = args[0]
      functions.setReminder(message.member, timeArg, args[1]);
      message.reply(`Set a reminder to \`${args[1]}\` in ${timeArg}`)
   },
};