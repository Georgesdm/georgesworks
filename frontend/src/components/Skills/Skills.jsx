import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Brands from "@fortawesome/free-brands-svg-icons"; // Importer toutes les icônes
import { fetchSkills } from "../../api/api";
import "./Skills.scss";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data); // Store the retrieved skills in the state
      } catch (error) {
        console.error("Erreur lors de la récupération des compétences:", error);
      }
    };

    loadSkills();
  }, []);

  // Fonction pour obtenir l'icône correspondante
  const getIcon = (iconName) => {
    // Formater l'icône saisie par l'utilisateur en fonction du format dans FontAwesome
    const icon = Brands[iconName];
    return icon || Brands["faDiaspora"]; // Si aucune icône n'est trouvée, utiliser une icône par défaut
  };

  return (
    <section id="skills" className="skills-section">
      <h2>Compétences</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill._id} className="skill-card">
            <div className="skill-icon" style={{ color: skill.color }}>
              <FontAwesomeIcon icon={getIcon(skill.icon)} size="4x" />
            </div>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
