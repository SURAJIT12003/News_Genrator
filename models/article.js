const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    summary: String,
    url: String,
    category: String,
    publishedAt: Date,
});

module.exports = mongoose.model('Article', articleSchema);
