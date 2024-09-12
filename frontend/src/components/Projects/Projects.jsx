import React from "react";
import "./Projects.scss";
import { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/projects");
        const data = await response.json();
        setProjects(data); // Mettre à jour l'état avec les projets récupérés
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects">
      <h2>Mes derniers Projets</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <img
              src={`http://localhost:4000${project.imageUrl}`}
              alt={project.title}
            />
            <div className="project-tech">
              {project.languages.map((language, index) => (
                <span key={index} className="tech-badge">
                  {language}
                </span>
              ))}
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
