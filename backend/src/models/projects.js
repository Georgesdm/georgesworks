const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre du projet est requis'], // Message d'erreur personnalisé
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'La description du projet est requise'],
    },
    imageUrl: {
        type: String,
        required: [true, 'L\'URL de l\'image du projet est requise'],
        trim: true,
        match: [/^https?:\/\/.+/, 'Veuillez entrer une URL valide'], // Validation d'URL
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;