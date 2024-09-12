import React, { useState, useEffect } from "react";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    languages: "",
    image: null,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchProjects();
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
  const addProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("languages", newProject.languages);
    formData.append("image", newProject.image);

    const response = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData, // Envoyer le projet et l'image
    });

    const data = await response.json();
    setProjects([...projects, data.project]); // Ajouter le nouveau projet à la liste des projets
    setNewProject({ title: "", description: "", languages: "", image: null }); // Réinitialiser le formulaire
  };

  const deleteProject = async (projectId) => {
    try {
      await fetch(`http://localhost:4000/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Mettre à jour l'état pour retirer le projet supprimé
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
    }
  };

  return (
    <div className="manage-projects">
      <h2>Ajouter un Projet</h2>

      <form onSubmit={addProject}>
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
        <input type="file" name="image" onChange={handleImageChange} required />
        <button type="submit">Ajouter le projet</button>
      </form>

      <h2>Liste des projets</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            Titre: {project.title} Ajouté le: {project.dateCreated}
            <button onClick={() => deleteProject(project._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProjects;
