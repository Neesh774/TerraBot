const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema');

module.exports = {
    name: 'birthdays',
    category: 'birthdays',
    description: 'TerraBot tells you how old everyone is :)',
    usage: `${config.prefix}birthdays [page]`,
    options: [{
      name: 'page',
      type: 'INTEGER',
      description: 'The page of birthdays you want to see',
      required: false,
    }],
    run: async (client, interaction) => {
    // command
      const list = await mSchema.find({ birthday: { $ne: null, $exists: true } });
      const numPages = Math.ceil(list.length / 10);
      const PS = await client.guilds.fetch(config.PS);
      const fields = [];
      let start = 0;
      let end = 10;
      let page = 1;
      if (list.length < 10) {
          end = list.length;
      }
      let numEntries = 10;
      const arg = interaction.options.getInteger('page') ? interaction.options.getInteger('page') : 1;
      if (arg > numPages || arg < 0) {
        return interaction.editReply('We don\'t seem to have that many users with birthdays yet.');
      }
      if (arg == numPages) {
        numEntries = list.length - 10 * (numPages - 1);
      }
      start = 10 * (arg - 1);
      end = numEntries + start;
      page = arg;
      try {
        for (let i = start; i < end; i++) {
          fields.push({ 'name': `#${i + 1} | ${list[i].name}`, 'value': `${list[i].birthday.toString().slice(4, 10)}` });
        }
      }
      catch (e) {
        return interaction.editReply('There was an error.');
      }
      const embed = new Discord.MessageEmbed()
        .setColor(config.embedColor)
        .setTitle(`Birthdays [${page}/${numPages}]`)
        .addFields(fields)
        .setAuthor('TerraBot Birthdays', PS.iconURL());
      return interaction.editReply({ embeds: [embed] });
    },
};