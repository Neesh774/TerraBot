const mongoose = require('mongoose');

const hlSchema = mongoose.Schema({
    userID: String,
    phrase: String,
    ignore: String,
});

hlSchema.index({ phrase: 'text' });
const model = mongoose.model('Highlights', hlSchema);

module.exports = model;