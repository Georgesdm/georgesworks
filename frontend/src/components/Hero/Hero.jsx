import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <h1>
          Concevoir des solutions web modernes pour une
          <span className="highlight">expérience fluide</span>
        </h1>

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
          <a
            href="https://drive.google.com/file/d/1mldNvzG5WnDTTiUkHFu2Tm7RhgH2wShJ/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <i className="fas fa-file"></i> CV
          </a>
          <a href="mailto:georgesdmpro@gmail.com" className="btn">
            <i className="fas fa-envelope"></i> Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
