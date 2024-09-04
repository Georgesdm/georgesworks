const Skill = require('../models/skills');
const fs = require('fs');
const path = require('path');

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.createSkill = async (req, res) => {
    const { name, level, description } = req.body;

    if (!name || !level || !description) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        const newSkill = new Skill({ name, level, description });
        await newSkill.save();
        res.status(201).json({ message: 'Compétence créée avec succès', skill: newSkill });
    } catch (error) {
        console.error('Erreur lors de la création de la compétence:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, level, description } = req.body;
    
    if (!name || !level) {
        return res.status(400).json({ message: 'Nom et niveau de compétence sont requis.' });
    }
    
    try {
        const skill = await Skill.findByIdAndUpdate(id, { name, level, description }, { new: true });
        res.status(200).json(skill);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la compétence:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.deleteSkill = async (req, res) => {
    const { id } = req.params;
    
    try {
        await Skill.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.error('Erreur lors de la suppression de la compétence:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};


exports.getOneSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill non trouvé' });
        }
        res.status(200).json(skill);
    } catch (error) {
        console.error('Erreur lors de la récupération du skill:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};