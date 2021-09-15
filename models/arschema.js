const mongoose = require('mongoose');

const arSchema = mongoose.Schema({
    id: Number,
    trigger: String,
    responsesArray: Array,
    created: String,
    createdByID: String,
});

module.exports = mongoose.model('Auto Responses', arSchema);