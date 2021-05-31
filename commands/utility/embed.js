const { MessageEmbed } = require("discord.js");
const config = require("C:/Users/kkanc/Beano/config.json");
module.exports = {
    name: "embed",
    category: "Administration",
    aliases: ["embed"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    memberpermissions: "MANAGE_MESSAGES",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You don't have permission for that.`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)
      );
      }
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provide a Title, nor a Description`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)
        );
      let userargs = args.join(" ").split("++");
      let title = userargs[0];
      let desc = userargs.slice(1).join(" ")
      message.delete().then(message.channel.send(new MessageEmbed()
        .setColor(config.embedColor)
        .setTitle(title ? title : "")
        .setDescription(desc ? desc : "")
      ));
      
    } catch (e) {
        console.log(e.stack);
        return message.reply("There was an error, please try again.");
    }
  }
}
/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
