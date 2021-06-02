const mongoose = require('mongoose');

const sSchema = mongoose.Schema({
    id: Number,
    suggestion: String,
    createdBy: String,
    createdByIcon: String,
    createdByID: String,
    createdAt: String,
    messageID: String,
    status: String,
    reason: String
});

module.exports = mongoose.model("Suggestion", sSchema);