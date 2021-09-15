const mongoose = require('mongoose');

const mChannelSchema = mongoose.Schema({
    channel: String,
});

module.exports = mongoose.model('XP Muted Channels', mChannelSchema);