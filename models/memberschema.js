const mongoose = require('mongoose');

const mSchema = mongoose.Schema({
    name: String,
    userID: String,
    coolDown: Boolean,
    muted: Boolean,
    starboards: Number,
    numberWarns: Number,
    warnReasons: Array,
    birthday: Date,
});

module.exports = mongoose.model('Members', mSchema);