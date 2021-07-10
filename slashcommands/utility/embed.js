const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'embed',
    category: 'Utility',
    usage: `${config.prefix}embed <TITLE> ++ <DESCRIPTION>`,
    description: 'Resends a message from you as an Embed',
    options: [
      {
        name: 'title',
        type: 'STRING',
        description: 'The title of your embed',
        required: true,
      },
        {
          name: 'description',
          type: 'STRING',
          description: 'The description of your embed',
          required: true,
        },
    ],
    run: async (client, message, args) => {
    try{
      if(!message.member.permissions.has('MANAGE_MESSAGES')){
        return message.reply({ embeds: [new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('❌ ERROR | You don\'t have permission for that.')] },
      );
      }
      message.reply({ content: 'Successfully sent the embed!', ephemeral: true });
      const title = args[0];
      const desc = args[1];
      message.channel.send({ embeds: [new MessageEmbed()
        .setColor(config.embedColor)
        .setTitle(title ? title : '')
        .setDescription(desc ? desc : '')] },
      )
    }
 catch (e) {
        console.log(e.stack);
        return message.reply({ content: ':x: There was an error. Please make sure you\'re using the proper arguments and try again.' });
    }
  },
}
