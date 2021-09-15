const mongoose = require('mongoose');

const rrSchema = mongoose.Schema({
    id: Number,
    messageID: String,
    channelID: String,
    roleID: String,
    reactionID: String,
});

module.exports = mongoose.model('Reaction Roles', rrSchema);