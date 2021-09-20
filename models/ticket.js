const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    memberID: String,
    memberName: String,
    channelID: String,
    ticketMessage: String,
});

module.exports = mongoose.model('Tickets', ticketSchema);