const Project = require('../models/projects');

exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.createProject = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        const newProject = new Project({ title, description, imageUrl });
        await newProject.save();
        res.status(201).json({ message: 'Projet créé avec succès', project: newProject });
    } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
    
    if (!title || !description || !imageUrl) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
    
    try {
        const project = await Project.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true });
        res.status(200).json(project);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du projet:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    
    try {    
        await Project.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {    
        console.error('Erreur lors de la suppression du projet:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

//get one project
exports.getOneProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};