import React, { useState, useEffect } from "react";
import { fetchProjects, addProject, deleteProject } from "../../api/api";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    languages: "",
    image: null,
    link: "",
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    loadProjects();
  }, []);

  // Gérer les changements dans les inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProject({ ...newProject, image: e.target.files[0] });
  };

  // Ajouter un nouveau projet avec l'upload d'image
  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("languages", newProject.languages);
    formData.append("image", newProject.image);
    formData.append("link", newProject.link);

    try {
      const data = await addProject(formData);
      setProjects([...projects, data.project]);
      setNewProject({
        title: "",
        description: "",
        languages: "",
        image: null,
        link: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
    }
  };

  return (
    <div className="manage-projects">
      <h2>Ajouter un Projet</h2>

      <form onSubmit={handleAddProject}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={newProject.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProject.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="languages"
          placeholder="Langages utilisés"
          value={newProject.languages}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="link"
          placeholder="GitHub Link"
          value={newProject.link}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="image" onChange={handleImageChange} required />
        <button type="submit">Ajouter le projet</button>
      </form>

      <h2>Liste des projets</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            Titre: {project.title} Ajouté le: {project.dateCreated}
            <button onClick={() => handleDeleteProject(project._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProjects;
