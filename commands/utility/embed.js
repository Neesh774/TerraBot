const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'embed',
    category: 'Utility',
    usage: `${config.prefix}embed <TITLE> ++ <DESCRIPTION>`,
    description: 'Resends a message from you as an Embed',
    run: async (client, message, args) => {
    try{
      if(!message.member.permissions.has('MANAGE_MESSAGES')){
        return message.channel.send({ embeds: [new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('❌ ERROR | You don\'t have permission for that.')] },
      );
      }
      message.delete();
      const userargs = args.join(' ').split('++');
      const title = userargs[0];
      const desc = userargs.slice(1).join(' ')
      message.channel.send({ embeds: [new MessageEmbed()
        .setColor(config.embedColor)
        .setTitle(title ? title : '')
        .setDescription(desc ? desc : '')] },
      )
    }
 catch (e) {
        console.log(e.stack);
        return message.channel.send({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });
    }
  },
}
/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
