// models/skill.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;