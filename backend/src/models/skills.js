const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // Le nom de l'icône FontAwesome
    required: true,
  },
  color: {
    type: String, // Code couleur hexadécimal
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
