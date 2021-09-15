const Discord = require('discord.js');
const config = require('../../config.json');
const mSchema = require('../../models/memberschema.js');

module.exports = {
    name: 'birthday',
    category: 'birthdays',
    description: 'TerraBot tells you when your birthday is. It\'s ok, we can all forget sometimes.',
    usage: `${config.prefix}birthday`,
    options: [],
    run: async (client, interaction) => {
    // command
        const hasbday = await mSchema.findOne({ userID: interaction.user.id, birthday: { $exists: true } });
        if (!hasbday) {
            return interaction.editReply('You don\'t have a birthday! Set one using the `setbday <mm> <dd>` command!');
        }
        const formattedDate = hasbday.birthday.toString().slice(4, 10);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setDescription(`Your birthday is set to ${formattedDate}`);
        return interaction.editReply({ embeds: [embed] });
    },
};