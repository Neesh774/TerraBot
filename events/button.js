const { GuildMember } = require('discord.js');
const messageFuncs = require('../functions/messageFuncs');
module.exports = {
    name: 'button',
    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (interaction.isButton()) {
            if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
                return void interaction.followUp({
                    content: 'You are not in my voice channel!',
                    ephemeral: true,
                });
            }
            if (interaction.customId === 'pause') {
                interaction.reply({
                    content: `Music has been pasued by **${interaction.user.tag}**`,
                });

                queue.setPaused(true);

            }
            else if (interaction.customId === 'resume') {

                queue.setPaused(false);

                interaction.reply({
                    content: `Music has been resumed by **${interaction.user.tag}**`,
                });

            }
            else if (interaction.customId === 'bassboostbtn') {
                await queue.setFilters({
                    bassboost: !queue.getFiltersEnabled().includes('bassboost'),
                    normalizer2: !queue.getFiltersEnabled().includes('bassboost'),
                });
                return interaction.reply({ content: `Bassboost was ${queue.getFiltersEnabled().includes('bassboost') ? 'Enabled' : 'Disabled'}` + ` By: **${interaction.user.tag}**` });

            }
            else if (interaction.customId === 'distortbtn') {
                await queue.setFilters({
                    earrape: !queue.getFiltersEnabled().includes('earrape'),
                    normalizer2: !queue.getFiltersEnabled().includes('earrape'),

                });
                return interaction.reply({ content: `Distortion was ${queue.getFiltersEnabled().includes('earrape') ? 'Enabled' : 'Disabled'}` + ` By: **${interaction.user.tag}**` });

            }
            else if (interaction.customId === 'flangerbtn') {
                await queue.setFilters({
                    flanger: !queue.getFiltersEnabled().includes('flanger'),
                    normalizer2: !queue.getFiltersEnabled().includes('flanger'),

                });
                return interaction.reply({ content: `Flanger was ${queue.getFiltersEnabled().includes('flanger') ? 'Enabled' : 'Disabled'}` + ` By: **${interaction.user.tag}**` });
            }
            else if (interaction.customId === 'ticketcreate') {
                await messageFuncs.createTicket(interaction.member, client, interaction);
            }
            else if (interaction.customId.startsWith('ticketdelete')) {
                await messageFuncs.deleteTicket(interaction, interaction.customId.split(' ')[1], client);
            }
        }
    },
};
