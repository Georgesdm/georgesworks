const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  languages: {
    type: [String], // Tableau de langages utilisés
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
