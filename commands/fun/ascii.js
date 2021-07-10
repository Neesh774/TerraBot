var figlet = require('figlet');
const config = require('../../config.json');

module.exports = {
  name: 'ascii',
  category: 'fun',
  description: 'Converts text info ASCII',
  usage: `${config.prefix}ascii <text>`,
  run: async (client, message, args) => {
    // command
    var maxLen = 100;

    if(args.join(' ').length > maxLen) return message.channel.send({ content: `The max length is ${maxLen}!` })

    if(!args[0]) return message.channel.send({ content: 'Please enter some text.' });

    figlet(`${args.join(' ')}`, function(err, data) {
        if (err) {
            console.dir(err);
            return;
        }

        message.channel.send({ content: `\`\`\`${data}\`\`\`` });
    });
  },
};