const mongoose = require('mongoose');

const mSchema = mongoose.Schema({
    name: String,
    userID: String,
    level: Number,
    coolDown: Boolean,
    toNextLevel: Number,
    xp: Number,
    levelxp: Number,
    muted: Boolean,
    starboards: Number,
});

module.exports = mongoose.model("Levels", mSchema);