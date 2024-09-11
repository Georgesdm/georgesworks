const Project = require("../models/projects");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.createProject = async (req, res) => {
  const { title, description, languages } = req.body;

  if (!title || !description || !languages || !req.body.imageUrl) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const newProject = new Project({
      title,
      description,
      languages: languages.split(","),
      imageUrl: req.body.imageUrl,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Projet créé avec succès", project: newProject });
  } catch (error) {
    console.error("Erreur lors de la création du projet:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, languages, imageUrl } = req.body;

  if (!title || !description || !languages || !imageUrl) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { title, description, languages: languages.split(","), imageUrl },
      { new: true }
    );
    res.status(200).json(project);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    res.status(200).json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du projet" });
  }
};

exports.getOneProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Erreur lors de la récupération du projet:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
