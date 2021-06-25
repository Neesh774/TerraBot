const Discord = require("discord.js")
const mSchema = require("../../models/memberschema");
const config = require("../../config.json");

module.exports = {
  name: "sblb",
  category: "Starboards",
  description: "Gives you a list of who has the most starboards",
  usage: `${config.prefix}sblb [page]`,
  run: async (client, message, args) => {
    let list = await mSchema.find({});
    list.sort(function(a,b){
        return b.starboards - a.starboards;
    });
    list = list.filter(member => member.starboards > 0);
    let numPages = Math.ceil(list.length / 10);
    const PS = await client.guilds.fetch(config.PS); 
    let fields = [];
    let start = 0;
    let end = 10;
    let page = 1;
    if(list.length < 10){
        end = list.length;
    }
    let numEntries = 10;
    let arg = 1;
    if(args[0]){
      arg = args[0];
    }
    if(args[0] > numPages || args[0] < 0){
      return message.reply("We don't seem to have that many users with starboards yet.");
    }
    if(args[0] == numPages){
      numEntries = list.length - 10*(numPages - 1);  
    }
    start = 10 * (arg - 1);
    end = numEntries + start;
    page = arg;
    console.log(list);
    if(!list[i]){
      return message.reply("Looks like we don't have any starboards yet :/");
    }
    for(var i = start; i < end; i ++){
      fields.push({"name": `#${i+1} | ${list[i].name}`, "value": `${list[i].starboards}`})
    }
    let embed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
      .setTitle(`Starboards [${page}/${numPages}]`)
      .addFields(fields)
      .setAuthor("TerraBot Starboard Leaderboard", PS.iconURL());
    return message.reply({embeds: [embed]});
  }
};