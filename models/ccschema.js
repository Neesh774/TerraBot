const mongoose = require('mongoose');

const ccSchema = mongoose.Schema({
    id: Number,
    trigger: String,
    responsesArray: Array,
    created: String,
    createdByID: String,
});

module.exports = mongoose.model('CustomCommand', ccSchema);