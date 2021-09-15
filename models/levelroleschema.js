const mongoose = require('mongoose');

const lrSchema = mongoose.Schema({
    roleID: String,
    level: Number,
});

module.exports = mongoose.model('level role', lrSchema);