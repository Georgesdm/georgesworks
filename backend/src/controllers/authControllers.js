const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

exports.signUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error('Champs requis manquants');
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
        console.log('Vérification de l\'utilisateur existant...');
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('Utilisateur déjà existant');
            return res.status(409).json({ message: "L'utilisateur existe déjà" });
        }

        console.log('Hachage du mot de passe...');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        console.log('Utilisateur enregistré avec succès');

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error('Champs requis manquants');
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
        console.log('Recherche de l\'utilisateur...');
        const user = await User.findOne({ email });
        if (!user) {
            console.error('Utilisateur non trouvé');
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        console.log('Comparaison du mot de passe...');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.error('Mot de passe incorrect');
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        console.log('Génération du token JWT...');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ userId: user._id, token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};