const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "embed",
    category: "Administration",
    aliases: ["embed"],
    cooldown: 2,
    usage: `${config.prefix}embed <TITLE> ++ <DESCRIPTION>`,
    description: "Resends a message from you as an Embed",
    memberpermissions: "MANAGE_MESSAGES",
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
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send({embeds: [new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`❌ ERROR | You don't have permission for that.`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)]}
      );
      }
      if(!args[0])
        return message.channel.send({embeds: [new MessageEmbed()
            .setColor(config.embedColor)
            .setTitle(`❌ ERROR | You didn't provide a Title, nor a Description`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)]}
        );
        message.delete();
      let userargs = args.join(" ").split("++");
      let title = userargs[0];
      let desc = userargs.slice(1).join(" ")
      message.channel.send({embeds: [new MessageEmbed()
        .setColor(config.embedColor)
        .setTitle(title ? title : "")
        .setDescription(desc ? desc : "")]}
      )
    } catch (e) {
        console.log(e.stack);
        return message.channel.send({content: ":x: There was an error. Please make sure you're using the proper arguments and try again."});
    }
  }
}
/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
