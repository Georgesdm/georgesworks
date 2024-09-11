import React from "react";
import "./About.scss";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <div className="about-description">
          <h2>À propos de moi</h2>
          <p>
            Je suis un développeur web passionné, spécialisé dans la conception
            et le développement de solutions web modernes. Avec une maîtrise des
            technologies front-end et back-end, je m'efforce de créer des
            applications web performantes, évolutives et intuitives. Mon
            objectif est d'offrir des expériences utilisateurs optimisées tout
            en garantissant une qualité de code maintenable.
          </p>
          <p>
            Mes compétences techniques incluent, entre autres, JavaScript,
            React, Node.js, Express, MongoDB, ainsi que les technologies HTML5
            et CSS3. Je suis constamment à la recherche des meilleures pratiques
            et des dernières innovations pour améliorer mes projets et apprendre
            de nouvelles technologies.
          </p>
        </div>

        <div className="about-timeline">
          <h2>Mon Parcours</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2024 Formation Développeur Web</h3>

                <p>
                  En 2024, j'ai terminé une formation en développement web, avec
                  une spécialisation en front-end et back-end, me permettant de
                  créer des applications modernes et performantes.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2017-2024 Graphiste Freelance</h3>
                <p>
                  Depuis 2017, je travaille en tant que graphiste freelance,
                  aidant mes clients à développer leur identité visuelle et à
                  créer des supports de communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
