require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoose } = require('./src/database/mongo'); // Connexion à MongoDB
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Route de test pour s'assurer que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});