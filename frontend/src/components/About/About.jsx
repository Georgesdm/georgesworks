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
                  Depuis 2017, je suis graphiste freelance, principalement dans
                  le design d'assets pour des vêtements, du merchandising, des
                  événements, et plus encore. Je crée des visuels qui mettent en
                  valeur les marques de mes clients et captivent leur audience.
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
