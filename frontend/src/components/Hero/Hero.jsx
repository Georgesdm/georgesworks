import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <p>
          Je crée des solutions web modernes, performantes et fiables, en
          utilisant les technologies les plus récentes pour offrir une
          expérience fluide et optimisée.
        </p>
        <div className="social-links">
          <a
            href="https://github.com/Georgesdm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <i className="fab fa-github"></i> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/Georgesdm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="/cv.pdf" download className="btn">
            <i className="fas fa-file"></i> CV
          </a>
          <a href="mailto:votre-email@example.com" className="btn">
            <i className="fas fa-envelope"></i> Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
