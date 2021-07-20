const Discord = require("discord.js");
const config = require("../../config.json");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const advancedFormat = require("dayjs/plugin/advancedFormat");
module.exports = {
    name: "timezones",
    category: "utility",
    description: "TerraBot will give you a collection of all of the timezones",
    usage: `${config.prefix}timezones`,
    options: [],
    run: async (client, message, args) => {
    //command
        dayjs.extend(utc);
        dayjs.extend(customParseFormat);
        dayjs.extend(advancedFormat);
        let now = new dayjs().utc();
        let gmt = now.format("hh:mm A dddd, MMM Do, YYYY");
        let pdt = now.add(-7, 'hour').format("hh:mm A");
        let cdt = now.add(-5, 'hour').format("hh:mm A");
        let edt = now.add(-4, 'hour').format("hh:mm A");
        let bst = now.add(1, 'hour').format("hh:mm A");
        let cest = now.add(2, 'hour').format("hh:mm A");
        let ast = now.add(3, 'hour').format("hh:mm A");
        let ist = now.add(5, 'hour').add(30, 'minute').format("hh:mm A");
        let awst = now.add(8, 'hour').format("hh:mm A");
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
        return message.reply({embeds: [embed]});
    }
};