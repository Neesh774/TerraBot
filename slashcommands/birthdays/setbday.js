const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema.js');
const functions = require('../../functions/databaseFuncs');

module.exports = {
    name: 'setbday',
    category: 'birthdays',
    description: 'TerraBot sets your birthday!',
    usage: `${config.prefix}setbday <mm> <dd>`,
    options: [{
        name: 'month',
        type: 'INTEGER',
        description: 'The month of your birthday, must be between 0 and 12.',
        required: true,
    },
    {
        name: 'day',
        type: 'INTEGER',
        description: 'The day of your birthday, must be between 0 and 31',
        required: true,
    }],
    run: async (client, interaction) => {
    // command
        const month = interaction.options.getInteger('month');
        const day = interaction.options.getInteger('day');
        if ((!month || !day) || month < 0 || month > 12 || day > 31 || day < 1) {
            return interaction.editReply('Please send me your birthday in the format `<mm> <dd>`(with spaces in between)!');
        }
        const hasbday = await mSchema.findOne({ userID: interaction.user.id, birthday: { $exists: true } });
        if (hasbday) {
            await hasbday.remove();
        }
        const datestring = `${month} ${day}`;
        let member = await mSchema.findOne({ userID: interaction.user.id });
        if (!member) {
            await functions.createMember(interaction.user.username, interaction.user.id);
        }
        member = await mSchema.findOne({ userID: interaction.user.id });
        member.birthday = new Date(datestring);
        await member.save();
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setTitle('Birthday set successfully')
            .setDescription(`I set your birthday to ${new Date(datestring).toString().slice(4, 10)}`);
        return interaction.editReply({ embeds: [embed] });
    },
};