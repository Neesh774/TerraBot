const mongoose = require('mongoose');

const sbSchema = mongoose.Schema({
	messageID: String,
	channelID: String,
	author: String,
	authorID: String,
	authorAvatar: String,
	id: Number,
	starboardID: String,
});

module.exports = mongoose.model('Starboard entries', sbSchema);