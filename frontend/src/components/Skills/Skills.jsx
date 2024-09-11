import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faReact,
  faNodeJs,
  faGithub,
  faFigma,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import "./Skills.scss";

const skills = [
  { name: "Figma", icon: faFigma, color: "#0061fd" },
  { name: "GitHub", icon: faGithub, color: "#ffffff" },
  { name: "HTML5", icon: faHtml5, color: "#E34F26" },
  { name: "CSS3", icon: faCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: faJsSquare, color: "#F7DF1E" },
  { name: "React", icon: faReact, color: "#61DAFB" },
  { name: "Sass", icon: faSass, color: "#ff99f1" },
  { name: "Node.js", icon: faNodeJs, color: "#339933" },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2>Compétences</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-icon" style={{ color: skill.color }}>
              <FontAwesomeIcon icon={skill.icon} size="4x" />{" "}
            </div>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
