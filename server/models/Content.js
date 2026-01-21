const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    }, // e.g., 'home_hero_title'
    section: {
        type: String,
        required: true
    }, // e.g., 'home'
    value: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    } // text, image, richtext
}, {
    timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);
