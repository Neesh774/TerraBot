const ms = require('ms');
const config = require('../../config.json');

const functions = require('../../functions.js');
module.exports = {
   name: 'study',
   description: 'TerraBot will isolate you so you can study in peace.',
   usage: `${config.prefix}study <time>`,
   options: [
      {
         name: 'time',
         type: 'STRING',
         description: 'The time that you\'ll be studying',
         required: true,
     },
   ],
   run: async (client, message, args) => {
      const time = args[0];
      message.reply(`Alright, I'm going to let you study for ${time}. Make me proud, ok?`);
      message.member.roles.add(config.mutedRole);
      setTimeout(() => {
          message.member.roles.remove(config.mutedRole);
          message.member.send(`${message.user.toString()}, did you study well?`);
      }, ms(time));
   },
};