const Discord = require("discord.js");
const config = require("../../config.json");
const functions = require("../../functions.js");
module.exports = {
    name: "timezones",
    category: "utility",
    description: "TerraBot will give you a collection of all of the timezones",
    usage: `${config.prefix}timezones`,
    run: async (client, message, args) => {
    //command
        const start = new Date();
        let gmt = start.toUTCString().substring(0, 25);
        const time = gmt.substring(17, 22);
        gmt = gmt.substring(0, 17);
        gmt += functions.getTime(time, 0, 0); 
        const pdt = await functions.getTime(time, 5, 0);
        const cdt = await functions.getTime(time, -5, 0);
        const edt = await functions.getTime(time, -4, 0);
        const bst = await functions.getTime(time, 1, 0);
        const cest = await functions.getTime(time, 2, 0);
        const ast = await functions.getTime(time, 3, 0);
        const ist = await functions.getTime(time, 5, 30);
        const awst = await functions.getTime(time, 8, 0);
        let embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setAuthor("All times given in 12 hour notation", "https://tse1.mm.bing.net/th?id=OIP.XfXafaMw5yAIvnx4P9ihYQHaHa&pid=Api")
            .setTitle("GMT")
            .setDescription("```css\n" + gmt + "```")
            .addField("PDT", "```css\n" +  pdt + "```", true)
            .addField("CDT", "```css\n" +  cdt + "```", true)
            .addField("EDT/AST", "```css\n" +  edt + "```", true)
            .addField("BST", "```css\n" +  bst + "```", true)
            .addField("CEST", "```css\n" +  cest + "```", true)
            .addField("AST", "```css\n" +  ast + "```", true)
            .addField("IST", "```css\n" +  ist + "```", false)
            .addField("AWST/SGT", "```css\n" +  awst + "```", false)
        return message.channel.send({embeds: [embed]});
    }
};