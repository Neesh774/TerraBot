const mongoose = require('mongoose');

const bSchema = mongoose.Schema({
    user: String,
    userID: String,
    birthday: Date
});

module.exports = mongoose.model("birthday", bSchema);