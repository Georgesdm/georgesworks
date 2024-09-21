import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { fetchProjects, API_URL } from "../../api/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="projects">
      <h2>Mes derniers Projets</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <img src={`${API_URL}${project.imageUrl}`} alt={project.title} />

            <div className="project-tech">
              {project.languages.map((language, index) => (
                <span key={index} className="tech-badge">
                  {language}
                </span>
              ))}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-badge"
                >
                  <i className="fab fa-github"></i> Lien{" "}
                </a>
              )}
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
