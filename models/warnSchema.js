const mongoose = require('mongoose');

const wSchema = mongoose.Schema({
    numberWarns: Number,
    reasons: Array,
    warned: String,
    warnedID: String
});

module.exports = mongoose.model("Warning", wSchema);