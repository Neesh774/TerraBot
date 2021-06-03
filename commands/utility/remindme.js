const ms = require('ms');
const functions = require('C:/Users/kkanc/Beano/functions.js')
module.exports = {
   name: 'remindme',
   description: 'Set a reminder',
   args: true,
   usage: '!bremindme <time> <reminder>',
   run: async (client, message, args) => {
      const timeArg = args.shift();
      functions.setReminder(message, timeArg, args.join(' '));
   }
};